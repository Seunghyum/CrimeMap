const { src } = require('gulp');
const crime = require('./task/crime');
const { register } = require('ts-node');
let mysql: object;

// TODO 바벨을 적용하거나, backend로 이동
function defaultTask(cb: Function) {
    mysql = require('./src/lib/mysql.ts')['defults'];
    console.log(mysql);

    // return crime.setCrimeData().then((result) => {
    //     mysql.end();
    //     return cb();
    // });
}

exports.default = defaultTask;
