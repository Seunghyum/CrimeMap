const { src } = require('gulp');
const crime = require('./src/crime');
// TODO  바벨을 적용하거나, backend로 이동
const mysql = require('../backend/src/lib/mysql.js');

function defaultTask(cb) {
    mysql.init();

    return crime.setCrimeData().then(() => {
        return cb();
    });
}

exports.default = defaultTask;
