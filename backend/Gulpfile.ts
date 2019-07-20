import { src } from 'gulp';
import crime from './task/crime';
import mysql from './src/lib/mysql';

// TODO 바벨을 적용하거나, backend로 이동
async function defaultTask(cb: Function) {
    const result = await crime.setCrimeData();
    await mysql.end();
    return cb();
}

export default defaultTask;
