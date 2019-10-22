'use strict'

const axios = use('axios')
const Logger = use('Logger')
const { getTime } = require('../../Tools/helper')
const puppeteer = require('puppeteer')

class TestController {
  async index() {
    puppeteer.launch().then(async browser => {
      const page = await browser.newPage()
      await page.goto('https://www.taobao.com')
      await page.screenshot({ path: 'screenshot.png' })
      await browser.close()
    })
  }

  /**
   * 抓取各类新闻
   * @param {object} request
   * @param {object} response
   */
  async news({ request, response }) {
    const supports = ['toutiao', 'baidu', 'tencent', 'sohu']
    const type = request.input('type')
    if (!supports.includes(type)) {
      return 'crawler news type error'
    }
    const { status, data } = await axios.get(
      'https://api.github.com/users/livissnack'
    )
    return response.json(data)
  }
}

module.exports = TestController
