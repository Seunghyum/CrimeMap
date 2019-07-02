global._isProduction = process.env.NODE_ENV === 'production';
global._isDev = !global._isProduction;
global.phase = (global._isProduction) ? 'production' : 'dev';

import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import path from 'path';
import lodash from 'lodash';
import Mysql from './mysql';

global._ = lodash;

const CONFIG_PATH = path.resolve(__dirname, 'config.json');
global.__config = require(CONFIG_PATH);

let app = express();
app.server = http.createServer(app);

/*
    logger
    개발용을 위해 response에 따라 색상이 입혀진 축약된 로그를 출력합니다. :status값이 빨간색이면 서버 에러코드, 노란색이면 클라이언트 에러 코드, 청록색은 리다이렉션 코드, 그외 코드는 컬러가 없습니다.
*/
app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: __config.corsHeaders
}));

app.use(bodyParser.json({
	limit: __config.bodyLimit
}));

// 데이터 베이스 연결
(() => {
    const { dev } = __config.app;

    const mysql = new Mysql();
    mysql.init();

    app.server.listen(process.env.PORT || dev.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
})();

export default app;
