'use strict';

const { random_str, two_color_ball, httpString } = require('../../Tools/helper');
const urlParse = require('url');
const axios = require('axios');
const puppeteer = use('puppeteer');
const fs = require('fs');
const DownloadService = use('App/Services/DownloadService');
const ImportService = use('App/Services/ImportService');
const ExportService = use('App/Services/ExportService');

class TestController {
  async index() {
    const url = 'https://aweme.snssdk.com/aweme/v1/play/?video_id=v0300fff0000c0lmr8kf43g0fjthuuv0&ratio=720p&line=0'
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    return redirect_url
    return random_str(8, { letters: true, numbers: true, specials: false });
  }

  async huaben({ request, response }) {

    let downloadArr = await ImportService.ImportClassification('download/download1.xlsx')
    downloadArr.shift()
    for (const item of downloadArr) {
      const index1 = downloadArr.indexOf(item);
      let fileName = item[1]
      let downloadUrl = item[2]
      await DownloadService.HandleDownload(fileName, downloadUrl)
    }
    return downloadArr
  }
}

module.exports = TestController;
