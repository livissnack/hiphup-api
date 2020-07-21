'use strict';

const Helpers = use('Helpers');
const ImportService = use('App/Services/ImportService');
const ExportService = use('App/Services/ExportService');

class ExcelController {
  /**
   * import excel data
   * @param {object} request
   * @param {object} response
   */
  async import({ request, response }) {
    let upload = request.file('upload');
    let fname = `${new Date().getTime()}.${upload.extname}`;
    let dir = 'upload/';

    await upload.move(Helpers.tmpPath(dir), {
      name: fname,
    });

    if (!upload.moved()) {
      return upload.error(), 'Error moving files', 500;
    }

    let send = await ImportService.ImportClassification('tmp/' + dir + fname);
    return response.json(send);
  }

  /**
   * export excel data
   * @param {object} request
   * @param {object} response
   */
  async export({ request, response }) {
    const data = {
      headers: [
        {
          header: '编号',
          key: 'id',
          width: 25,
          style: { bold: true },
        },
        {
          header: '姓名',
          key: 'name',
          width: 30,
          style: { bold: true },
        },
        {
          header: '年龄',
          key: 'age',
          width: 30,
          style: { bold: true },
        },
        {
          header: '性别',
          key: 'gender',
          width: 30,
          style: { bold: true },
        },
      ],
      rows: [
        { id: 1, name: '小明', age: 26, gender: '男' },
        { id: 2, name: '小红', age: 27, gender: '女' },
        { id: 3, name: '小话', age: 25, gender: '男' },
      ],
    };
    let filepath = await ExportService.ExportClassification(data);
    return response.attachment(filepath);
  }
}

module.exports = ExcelController;
