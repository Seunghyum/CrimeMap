import mysql from '../mysql';
const MYSQL_OP = {
    OR: '||',
    GT: '>',
    LT: '<',
    GE: '>=',
    LE: '<=',
    NOT: '!='
};

class Model {
    constructor(options) {
        const { table, excludes, parseData } = options;
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
            if (_.isEmpty(result)) {
                return Promise.reject('데이터가 존재 하지 않습니다.');
            }

            return _.head(result);
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

        order [],
        limit 100
    */
    fetchList({ where, order, limit }) {
        if (_.isEmpty(where)) {
            let whereString = 'WHERE ';
            let orderString = 'ORDER ';
            let limitString = 'LIMIT ';

            _.each(where, (data, operator) => {
                if (MYSQL_OP[operator]) {
                    _.each(data, (value, key) => {
                        whereString += `${key} ${operator} ${value} `;
                    });
                }
            });

            if (order && _.isArray(order)) {
                orderString += order.join(', ');
            }

            if (limit && _.isNumber(limit)) {
                limitString += limit
            }

            return mysql.query(`SELECT * FROM WHERE ${whereString} ${orderString} ${limitString}`);
        }
    }

    update(where) {
        mysql.query();
    }

    insert(where) {
        mysql.query();
    }

    deleteById(id) {
        mysql.query();
    }
}

export default Model;
