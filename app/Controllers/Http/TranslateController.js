'use strict'
const {httpPost} = require('../../Tools/helper')

class TranslateController {
  async youdao({ request, response }) {
    const q = request.input('q')
    const from = request.input('from', 'zh-CHS')
    const to = request.input('to', 'en')

    const { data } = await httpPost('https://aidemo.youdao.com/trans', {
      q: q,
      from: from,
      to: to
    }, {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-Cn,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6,pl;q=0.5',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Host': 'aidemo.youdao.com',
      'Origin': 'https://ai.youdao.com',
      'Pragma': 'no-cache',
      'Referer': 'https://ai.youdao.com/product-fanyi-text.s',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
    })
    if(data.errorCode == 0) {
      return response.json({code: 200, message: 'ok', data: { tran_text: data.translation[0] }});
    }
    return response.json({code: 500, message: 'no'});
  }
}

module.exports = TranslateController
