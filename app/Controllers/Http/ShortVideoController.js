'use strict'

const urlParse = require('url');
const axios = require('axios');
const {
  http_get,
  is_empty,
} = require('../../Tools/helper');

class ShortVideoController {

  async douyin({ request, response }) {
    const url = request.input('url', 'https://v.douyin.com/eReT43D');
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    const parse_url = urlParse.parse(redirect_url, true).pathname
    const items_ids = parse_url.split("/")[3]

    const { data } = await http_get(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${items_ids}`);

    if (data.status_code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }

    let really_url = [data.item_list][0][0]['video']['play_addr']['url_list'][0]
    if (!is_empty(really_url)) {
      return response.json({
        code: 200,
        message: 'ok',
        data: really_url.replace('playwm', 'play'),
      });
    }

    return response.json({ code: 500, message: 'douyin url parse failure!' });
  }
}

module.exports = ShortVideoController
