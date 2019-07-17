const mysql = require('mysql');
const moment = require('moment');
const path = require('path');
const _ = require('lodash');
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

class Mysql {
    constructor() {
        this._dbConfig = require(CONFIG_PATH).databases;
        console.log(this._dbConfig)
        this.init();
    }

    init() {
        if (!this._dbConfig) {
            console.log('config 데이터가 존재하지 않습니다.');
            return;
        }

        const { user, password, database, host } = this._dbConfig;

        this._pool = mysql.createPool({
            host,
            user,
            password,
            database,
            multipleStatements : true,
            connectionLimit : 200
        });
    }

    getConnection() {
        if (!this._pool) {
            this.init();
        }

        return this._pool;
    }

    end() {
        if (this._pool) {
            this._pool.end((err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    escape(string) {
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

    query(sql, params) {
        if (!this._pool) {
            this.init();
        }

        return new Promise((resolve, reject) => {
            this._pool.getConnection((error, connection) => {
                if (connection) {
                    if (error) {
                        // 커넥션을 풀에 반환
                        connection.release();
                        reject(error);
                    }

                    connection.query(sql, params, (error, results) => {
                        let newResults = results;
                        connection.release();

                        if (error) {
                            reject(error);
                        }

                        resolve(newResults);
                    });
                }
            });
        }).catch((error) => {
            console.log(error);
            this.end();
        });
    }

    createWhere(where) {
        const whereArray = [];

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

        return `${whereArray.join(' AND ')}`
    }

    update(table, updateData, where) {
        if (!table) {
            return Promise.reject('Table이 존재하지 않습니다.');
        }

        if (!updateData) {
            return Promise.reject('UPDATE할 데이터가 필요합니다.');
        }

        let setDatas = [];

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
        `, [table]).then((result) => {
            return {
                affectedRows: result.affectedRows
            }
        }).catch(() => {

        });
    }

    insert(table, insertData) {
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

exports.defults = new Mysql();
