const { src } = require('gulp');
const crime = require('./task/crime');
let mysql;

// TODO 바벨을 적용하거나, backend로 이동
function defaultTask(cb) {
    mysql = require('./src/lib/mysql.js')['defults'];

    return crime.setCrimeData().then((result) => {
        mysql.end();
        return cb();
    });
}

exports.default = defaultTask;
