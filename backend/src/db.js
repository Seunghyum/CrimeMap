import Sequelize from 'sequelize';

class Mysql {
    constructor(dbConfig) {
        this._config = dbConfig;
    }

    init() {
        const { user, password, database, host, port } = this._config;
        this._sequelize = new Sequelize(database, user, password, {
            host: host,
            port: port,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }

    get() {
        return this._sequelize;
    }
}

export default Mysql;
