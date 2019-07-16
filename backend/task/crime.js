const { series, parallel, src  } = require('gulp');
const fs = require('fs');
const csvParser = require('csv-parse');
const path = require('path');
const iconv = require('iconv-lite');
const _ = require('lodash');
let mysql;

// const CRIME_TYPE = {
//     VIOLENT_CRIME: '강력범죄',
//     Murder: '살인기수',
//     attempted_murder: '살인미수',
//     burglary: '강도',
//     rapist: '강간',
//     force_ignominy: '강제추행',
//     like_rapist: '유사강간',
//     etc_rapist: '기타,강간',
//     arson: '방화',
//     theft: '절도'
//     violence: '폭력',
//     wound: '상해',
//     assault: '폭헹',
//     bondage: '감금',
//     Threat: '협박',
//     Snatch: '약취',
//     ETC_violence: '폭력행위'
// };

const OCCURED_YEAR = {
    0: 2011,
    1: 2012,
    2: 2013,
    3: 2014,
    4: 2015,
    5: 2016,
    6: 2017
};

exports.setCrimeData = async function() {
    mysql = require('../src/lib/mysql.js')['defults'];
    console.log('범죄 데이터를 입력한다.');
    const filePath = path.resolve(__dirname, '../../files/crime_by_region.csv');
    const content = fs.readFileSync(filePath);
    // content를 EUC-KR로 디코딩 해준다.
    const decodeContent = await iconv.decode(content, 'EUC-KR').toString();
    let parseContent = '';
    const promise = new Promise((resolve, reject) => {
        return csvParser(decodeContent, (err, output) => {
            if (err) {
                reject(err);
            }

            resolve(output);
        });
    });

    return promise.then((result, index) => {
        result = result.splice(0, 6);
        console.log(result);
        const arr = [];

        let promise = Promise.resolve();

        _.each(result, (datas, index) => {
            const type = datas[0];
            const region_code = datas[1];
            let year = 0;
            let count = 0;

            // promise = promise.then(() => {
            //     return mysql.insert('crime_region', {
            //         type: index,
            //         region_code: 41000000,
            //         count: 9
            //     });
            // });
        });

        return promise.then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
        });
    });
}
