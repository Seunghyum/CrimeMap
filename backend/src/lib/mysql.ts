import mysql, { Pool, MysqlError } from 'mysql';
import moment from 'moment';
import path from 'path';
import _ from 'lodash';

const CONFIG_PATH = path.resolve(__dirname, '../../config.json');
const MYSQL_OP = {
    OR: '||',
    GT: '>',
    LT: '<',
    GE: '>=',
    LE: '<=',
    NOT: '!=',
    ASSIGNMENT: '='
};

interface DbConfig {
    user?: string;
    password?: string;
    database?: string;
    host?: string;
}

class Mysql {
    private dbConfig?: object;
    private pool?: Pool;

    constructor() {
        this.dbConfig = require(CONFIG_PATH).databases;
        this.init();
    }

    async init() {
        if (!this.dbConfig) {
            console.log('config 데이터가 존재하지 않습니다.');
            return;
        }

        const { user, password, database, host }: DbConfig = this.dbConfig;

        this.pool = await mysql.createPool({
            host,
            user,
            password,
            database,
            multipleStatements : true,
            connectionLimit : 200
        });
    }

    async getConnection() {
        if (!this.pool) {
            await this.init();
        }

        return this.pool;
    }

    end() {
        if (!this.pool) {
            return;
        }

        this.pool.end((err: MysqlError) => {
            if (err) {
                console.log(err);
            }
        });
    }

    escape(string: string | object) {
        if (_.isObject(string)) {
            return null;
        }

        if (_.isArray(string)) {
            return _.compact(_.map(string, (val) => {
                return mysql.escape(val);
            }));
        }

        return mysql.escape(string);
    }

    async query(sql: string, params: object) {
        if (this.pool) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            if (!this.pool) {
                return;
            }

             this.pool.getConnection((error, connection) => {
                if (connection) {
                    if (error) {
                        // 커넥션을 풀에 반환
                        connection.release();
                        reject(error);
                    }

                    connection.query(sql, params, (error, results) => {
                        connection.release();

                        if (error) {
                            reject(error);
                        }

                        resolve(results);
                    });
                }
            });
        }).catch((error) => {
            console.log(error);
            this.end();
        });
    }

    createWhere(where: object) {
        const whereArray: any[] = [];

        _.each(where, (data, operator) => {
            if (MYSQL_OP[operator]) {
                const isAssignment = operator === '=';

                _.each(data, (value, key) => {
                    if (isAssignment) {
                        if (_.isArray(value)) {
                            whereArray.push(`${key} IN (${value.join(', ')})`);
                            return;
                        }
                    }

                    whereArray.push(`${key} ${operator} ${value}`);
                });
            }
        });

        return `${whereArray.join(' AND ')}`;
    }

    update(table: string, updateData: object, where: string | object) {
        if (!table) {
            return Promise.reject('Table이 존재하지 않습니다.');
        }

        if (!updateData) {
            return Promise.reject('UPDATE할 데이터가 필요합니다.');
        }

        const setDatas: string[] = [];

        _.each(updateData, (value, key) => {
            setDatas.push(`${key} = ${value}`);
        });

        const setQuery = setDatas.join(', ');

        return this.query(`
            UPDATE ??
            SET ${setQuery}
            WHERE ${this.createWhere({
                where
            })}
        `, [table]).then((result: any) => {
            return {
                affectedRows: result.affectedRows
            };
        }).catch(() => {

        });
    }

    insert(table: string, insertData: object | string) {
        if (!table) {
            return Promise.reject('Table이 존재하지 않습니다.');
        }

        if (!insertData) {
            return Promise.reject('INSERT할 데이터가 필요합니다.');
        }

        const values = _.map(_.values(insertData), (val) => {
            return this.escape(val);
        });

        return this.query(`
            INSERT INTO ??
                (${_.keys(insertData).join(', ')})
            VALUES
                (${values.join(', ')})
        `, [table]).then((result) => {
            return result;
        });
    }
}

export default new Mysql();
