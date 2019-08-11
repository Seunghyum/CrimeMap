import Mysql from '../../lib/mysql';

class Model {
    mysql: object;

    constructor() {
        this.mysql = new Mysql();
    }
}

export default Model;
