import mysql from '../mysql';

class Model {
    constructor(options) {
        const { table, excludes, parseData } = options;
        this.mysql = mysql;
        this.table = table;
        this.excludes = excludes || [];
        this.parseData = _.isFunction(parseData) ? parseData : null;
    }

    parse(data) {
        if (_.isArray(data)) {
            data = _.map(data, (item) => {
                if (this.parseData) {
                    return this.parseData(item);
                }

                if (!_.isEmpty(this.excludes)) {
                    _.each(this.excludes, (key) => {
                        delete data[key]
                    });
                }

                return item;
            })
        } else {
            if (this.parseData) {
                data = this.parseData(data);
            }

            if (!_.isEmpty(this.excludes)) {
                _.each(this.excludes, (key) => {
                    delete data[key]
                });
            }
        }

        return data;
    }

    fetchById(id) {
        return mysql.query('SELECT * FROM ? WHERE id = ?', [this.table ,id]).then((result) => {
            return _.head(this.parse(result));
        }).fail((reason) => {
            return Promise.reject(reason);
        });
    }

    /*
        where {
            > {
                id: 30,

            },
            <=: {

            },
            !: {

            }
        } || string ,
        && {
            id: [1,3,4,2],
            good: 1
        }
        order [],
        limit 100
    */
    fetchList({ where, order, limit }) {
        if (_.isEmpty(where)) {
            return Promise.reject('SELECT할 조건이 필요합니다.');
        }
        let orderString = '';
        let limitString = '';

        if (order && _.isArray(order)) {
            orderString += `ORDER BY ${order.join(', ')}`;
        }

        if (limit && _.isNumber(limit)) {
            limitString = `LIMIT ${limit}`
        }

        return this.mysql.query(`
            SELECT *
            FROM ?
            WHERE ${this.createWhere(where)}
            ${orderString}
            ${limitString}
        `,
            [this.table]
        ).then((result) => {
            return this.parse(result);
        }).fail((reason) => {
            return Promise.reject(reason);
        });
    }

    update(updateData, where) {
        if (!updateData) {
            return Promise.reject('UPDATE할 데이터가 필요합니다.');
        }

        let setDatas = [];

        _.each(updateData, (value, key) => {
            setDatas.push(`${key} = ${value}`);
        });

        const setQuery = setDatas.join(', ');

        return this.mysql.query(`
            UPDATE ?
            SET ${setQuery}
            WHERE ${this.createWhere({
                where
            })}
        `, [this.table]).then((result) => {
            console.log(result);
            return {
                affectedRows: result.affectedRows
            }
        }).fail((reason) => {
            return Promise.reject(reason);
        });
    }

    insert(insertData) {
        if (!insertData) {
            return Promise.reject('INSERT할 데이터가 필요합니다.');
        }

        let columns = [];
        let values = [];

        _.each(insertData, (vlaue, key) => {
            columns.push(key);
            values.push(vlaue);
        });

        return this.mysql.query(`
            INSERT INTO ?
                (${columns.join(', ')})
            VALUES
                (${values.join(', ')})
        `, [this.table]).then((result) => {
            const insertId = result.insertId;
            return this.fetchById(insertId);
        }).fail((reason) => {
            return Promise.reject(reason);
        });
    }

    deleteById(id) {
        if (!id) {
            return Promise.reject('DELETE에 필요한 ID가 존재 하지 않습니다.');
        }

        return this.mysql.query(`
            DELETE
            FROM ?
            WHERE id = ${id}
        `, [this.table]).then((result) => {
            console.log(result);
            return {
                affectedRows: result.affectedRows
            }
        }).fail((reason) => {
            return Promise.reject(reason);
        });
    }
}

export default Model;
