'use strict'

const Excel = require('exceljs')

class ImportService {
  static async ImportClassification(filelocation) {
    let workbook = new Excel.Workbook()
    workbook = await workbook.xlsx.readFile(filelocation)
    let worksheet = workbook.getWorksheet(1)

    let arrs = []
    worksheet.eachRow({ includeEmpty: false }, row => {
      arrs.push(row.values)
    })
    return arrs
  }
}

module.exports = ImportService
