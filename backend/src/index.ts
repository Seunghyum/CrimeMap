declare let global: any;
global._isProduction = process.env.NODE_ENV === 'production';
global._isDev = !global._isProduction;
global.phase = global._isProduction ? 'production' : 'dev';

import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import path from 'path';
import lodash from 'lodash';

global._ = lodash;

const CONFIG_PATH = path.resolve(__dirname, '../', 'config.json');
global.__config = require(CONFIG_PATH);

let app:any = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: global.__config.app.corsHeaders
}));

app.use(bodyParser.json({
	limit: global.__config.app.bodyLimit
}));

// 데이터 베이스 연결
(() => {
    const { dev } = global.__config.app;

    app.server.listen(process.env.PORT || dev.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
})();

export default app;
