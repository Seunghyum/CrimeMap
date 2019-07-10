const { src } = require('gulp');
const crime = require('./src/crime');

function defaultTask(cb) {
    return crime.setCrimeData().then(() => {
        return cb();
    });
}

exports.default = defaultTask;
