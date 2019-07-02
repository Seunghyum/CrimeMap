import mysql from 'mysql';

class Mysql {
    constructor() {
        this._dbConfig = __config.databases;
    }

    init() {
        const { user, password, database, host } = this._dbConfig;

        this._pool = mysql.createPool({
            host,
            user,
            password,
            database,
            connectionLimit : 10
        });
    }

    get() {
        if (!this._pool) {
            this.init();
        }

        return this._pool;
    }

    close() {
        if (this._pool) {
            this._pool.destory();
        }
    }

    escape(string) {
        if (_.isObject(string)) {
            return null;
        }

        if (_.isArray(string)) {
            return _.compact(_.map(string, (val) => {
                if (_.isString(val)) {
                    return mysql.escape(val);
                }

                return null;
            }));
        }

        return mysql.escape(string);
    }

    query(sql, params) {
        if (!this._pool) {
            this.init();
        }

        return new Promise((resolve, reject) => {
            this._pool.getConnection((error,connection) => {
                if (error) {
                    // 커넥션을 풀에 반환
                    connection.release();
                    reject(error);
                }

                connection.query(sql, params, (error, results) => {
                    let newResults = results;

                    if (error) {
                        connection.release();
                        reject(error);
                    }

                    resolve(newResults);
                });
            });
        });
    }
}

export default Mysql;
