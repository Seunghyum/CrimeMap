const _isProduction = process.env.NODE_ENV === 'production';
const _isDev = !_isProduction;
const phase = _isProduction ? 'production' : 'dev';

import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import * as schema from './api/schemas/schema';

const CONFIG_PATH = path.resolve(__dirname, '../', 'config.json');
const __config = require(CONFIG_PATH);

const { appServer } = __config;
const { dev } = appServer;

const app:any = express();
app.server = http.createServer(app);
app.use(morgan('dev'));
app.use(cors({
	exposedHeaders: dev.corsHeaders
}));

app.use(bodyParser.json({
	limit: dev.bodyLimit
}));

const apolloServer = new ApolloServer(schema);

apolloServer.applyMiddleware({
    app
});

// 데이터 베이스 연결
(async () => {
     app.server.listen(process.env.PORT || dev.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
})();

export default app;
