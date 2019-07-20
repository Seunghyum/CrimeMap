const { series, parallel, src  } = require('gulp');
const fs = require('fs');
const csvParser = require('csv-parse');
const path = require('path');
const iconv = require('iconv-lite');
const _ = require('lodash');
const moment = require('moment');
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

const OCCURED_YEAR = [
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'
];

const _parseRegionName = (regionName) => {
    if (!_.isString(regionName)) {
        return null;
    }

    return String(regionName)
        .replace('서울', '서울특별시')
        .replace('부산', '부산광역시')
        .replace('대구', '대구광역시')
        .replace('인천', '인천광역시')
        .replace('광주', '광주광역시')
        .replace('대전', '광주광역시')
        .replace('울산', '광주광역시')
        .replace('울산', '광주광역시')

};

exports.setCrimeData = async function() {
    mysql = require('../src/lib/mysql.js')['defults'];
    console.log('범죄 데이터를 입력한다.');
    const filePath = path.resolve(__dirname, '../../files/crime_by_region2.csv');
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
        const arr = [];
        let promise = Promise.resolve();
        const headers = result[0];
        result = result.splice(1);

        _.each(result, (datas, aindex) => {
            const type = Number(datas[0]);
            const regionName = datas[3];
            const counts = datas.splice(7);

            (({ type, regionName, counts }) => {
                _.each(counts, (count, index) => {
                    count = Number(count);

                    const year = String(OCCURED_YEAR[index]);
                    const occuredAt = moment(year).startOf('year').utc().format('YYYY-MM-DD HH:mm:ss');

                    const insertData = {
                        type: type,
                        count: !_.isFinite(count) ? 0 : count,
                        occured_at: moment(occuredAt).isValid() ? occuredAt : null,
                        region_name: regionName
                    };

                    ((insertData) => {
                        promise = promise.then(() => {
                            return mysql.insert('crime_region', insertData);
                        });
                    })(insertData)
                 });
            })({ type, regionName, counts })
        });

        return promise.then(() => {
            console.log(`범죄 데이터 ${result.length}개 입력 완료!`);
            return;
        }).catch((err) => {
            console.log(err);
        });
    });
}
