'use strict';

const axios = require('axios');
const { is_empty } = require('../../Tools/helper');

class UtilController {
  async douyin_redirect({ request, response }) {
    const url = request.input('url', 'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fff0000c0lmr8kf43g0fjthuuv0&ratio=720p&line=0');
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    if (!is_empty(redirect_url)) {
      return response.json({
        code: 200,
        message: 'ok',
        data: {
          video_url: redirect_url,
        }});
    }
    return response.json({ code: 500, message: 'douyin_redirect url parse failure!' });
  }
}

module.exports = UtilController;
