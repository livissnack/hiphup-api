'use strict';

const { httpString, is_empty} = require('../Tools/helper');
const axios = require("axios");
const fs = require("fs");
const _ = require('lodash');
const puppeteer = use('puppeteer');

class DownloadService {
  static async HandleDownload(fileName, downloadUrl) {
    let success = false
    let max_wse = 2;
    let tmp = Math.floor(Math.random()* max_wse);
    let wse_list = await this.initBrowser(max_wse);
    let browserWSEndpoint = wse_list[tmp];
    const browser = await puppeteer.connect({browserWSEndpoint});
    const page = await browser.newPage()
    try {
      await page.goto(downloadUrl)

      const code1 = await page.$x('//script[contains(., "setMedia")]')


      let content = await page.evaluate(el => el.innerHTML, code1[0])
      let waitArr = httpString(content)
      let downloadSrc = waitArr[0]
      if (is_empty(downloadSrc)) {
        success = false
      } else {
        const audioContent = await axios.get(downloadSrc, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(`download/${fileName}.mp3`, audioContent.data);
        success = true
      }
    } catch (error) {
      success = false
    } finally {
      let resStatus = success
      await page.close();
      return { downloadStatus: resStatus }
    }
  }

  static async initBrowser(max_wse = 4) {
    let WSE_LIST = []
    for (let i = 0; i <= max_wse; i++) {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '–disable-gpu',
          '–disable-dev-shm-usage',
          '–no-first-run',
          '–no-zygote',
          '–single-process',
        ],
      });
      let browserWSEndpoint = await browser.wsEndpoint();
      WSE_LIST[i] = browserWSEndpoint;
    }
    return WSE_LIST
  }
}

module.exports = DownloadService;
