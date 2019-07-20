import mysql from '../lib/mysql';

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
}

export default Model;
