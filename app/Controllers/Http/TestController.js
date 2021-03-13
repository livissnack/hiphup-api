'use strict';

const { random_str, two_color_ball } = require('../../Tools/helper');
const urlParse = require('url');
const axios = require('axios');

class TestController {
  async index() {
    const url = 'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fff0000c0lmr8kf43g0fjthuuv0&ratio=720p&line=0'
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    return redirect_url
    return random_str(8, { letters: true, numbers: true, specials: false });
  }
}

module.exports = TestController;
