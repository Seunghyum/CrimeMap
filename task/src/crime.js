const { series, parallel, src  } = require('gulp');
const fs = require('fs');
const csvParser = require('csv-parse');
const path = require('path');
const iconv = require('iconv-lite');

exports.setCrimeData = async function() {
    console.log('범죄 데이터를 입력한다.');
    const filePath = path.resolve(__dirname, '../files/crime_by_region.csv');
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

    return promise.then((result) => {
        console.log(result);
        return result;
    });
}
