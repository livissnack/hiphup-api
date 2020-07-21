'use strict';

const Helpers = use('Helpers');
const Excel = require('exceljs');
const { generateNumArrByNum, numToStr } = require('../Tools/helper');

class ExportService {
  static async ExportClassification(data) {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('sheet 1');
    worksheet.columns = data.headers;
    worksheet.addRows(data.rows);

    let strArr = [];
    let numArr = generateNumArrByNum(data.headers.length);
    numArr.forEach((item) => {
      strArr.push(numToStr(item) + 1);
    });

    strArr.forEach((cell) => {
      worksheet.getCell(cell).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFCCFFCC',
        },
        bgColor: {
          argb: 'FFCCFFCC',
        },
      };
      worksheet.getCell(cell).font = {
        name: 'Comic Sans MS',
        family: 4,
        color: { argb: 'FF00FF00' },
        bold: true,
      };
    });

    let filepath = Helpers.tmpPath(`download/${new Date().getTime()}.xlsx`);
    await workbook.xlsx.writeFile(filepath);
    return filepath;
  }
}

module.exports = ExportService;
