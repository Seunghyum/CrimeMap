import Model from '../../models/Model';
import { Pool } from 'mysql';
import * as _ from 'lodash';

class Crime extends Model {
    //  connection: Pool;
    tableName: string;

    constructor() {
        super(null);
        this.tableName = 'crime_region';
        // this.connection = this.mysql.getConnection();
    }

    async fetchList() {
        // const result = await this.connection.query(`
        //     SELECT *
        //     FROM ${this.tableName}
        //     WHERE occured_at IS NULL
        //     LIMIT 10
        // `);
        const result:[] = [];

        return _.map(result, (item: any) => {
            return {
                id: item.id,
                type: item.type,
                regionName: item.region_name
            };
        });
    }
}

export default Crime;
