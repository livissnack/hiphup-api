'use strict'

const puppeteer = use('puppeteer')

class CrawlerController {
  /**
   * 抓取各类新闻
   * @param {object} request
   * @param {object} response
   */
  async news({ request, response }) {
    try {
      const type = request.input('type', 'toutiao')

      const urlMap = new Map([
        ['baidu', 'http://news.baidu.com'],
        ['toutiao', 'https://www.toutiao.com'],
        ['tencent', 'https://news.qq.com'],
        ['yahoo', 'https://www.yahoo.com/news'],
        ['apnews', 'https://www.apnews.com'],
        ['default', 'http://news.baidu.com']
      ])

      const gotoUrl = urlMap.get(type)

      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto(gotoUrl)

      let list = []
      switch (type) {
        case 'baidu':
          const BAIDU_SELECTED = '.hotnews ul li strong a'
          list = await page.evaluate(BAIDU_SELECTED => {
            let elements = Array.from(document.querySelectorAll(BAIDU_SELECTED))
            let texts = elements.map(a => {
              return {
                url: a.href.trim(),
                title: a.innerText
              }
            })
            return texts
          }, BAIDU_SELECTED)
          break

        case 'toutiao':
          const TOUTIAO_SELECTED = 'feed-infinite-wrapper ul li a'
          list = await page.evaluate(TOUTIAO_SELECTED => {
            let elements = Array.from(
              document.querySelectorAll(TOUTIAO_SELECTED)
            )
            let texts = elements.map(a => {
              return {
                url: a.href.trim(),
                title: a.innerText
              }
            })
            return texts
          }, TOUTIAO_SELECTED)
          break

        case 'tencent':
          const TENCENT_SELECTED = '.list li .detail h3 a'
          list = await page.evaluate(TENCENT_SELECTED => {
            let elements = Array.from(
              document.querySelectorAll(TENCENT_SELECTED)
            )
            let texts = elements.map(a => {
              return {
                url: a.href.trim(),
                title: a.innerText
              }
            })
            return texts
          }, TENCENT_SELECTED)
          break

        case 'yahoo':
          const YAHOO_SELECTED = '#YDC-Stream ul li h3 a'
          list = await page.evaluate(YAHOO_SELECTED => {
            let elements = Array.from(document.querySelectorAll(YAHOO_SELECTED))
            let texts = elements.map(a => {
              return {
                url: a.href.trim(),
                title: a.innerText
              }
            })
            return texts
          }, YAHOO_SELECTED)
          break

        case 'apnews':
          const APNEWS_SELECTED = '.cards FeedCard c0175'
          list = await page.evaluate(APNEWS_SELECTED => {
            let elements = Array.from(
              document.querySelectorAll(APNEWS_SELECTED)
            )
            let texts = elements.map(a => {
              return {
                url: a.href.trim(),
                title: a.innerText
              }
            })
            return texts
          }, APNEWS_SELECTED)
          break

        default:
          break
      }

      browser.close()
      return response.json({ code: 200, data: list, message: 'ok' })
    } catch (error) {
      return response.json({ code: 500, message: error.toString() })
    }
  }

  /**
   * 抓取kms激活服务地址集
   * @param {object} request
   * @param {object} response
   */
  async kms({ request, response }) {
    try {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto(
        'https://gist.github.com/CHEF-KOCH/29cac70239eed583ad1c96dcb6de364b'
      )

      const sel = '#file-kms-md-readme article ul li'
      const kmsList = await page.evaluate(sel => {
        let elements = Array.from(document.querySelectorAll(sel))
        let texts = elements.map(element => {
          return element.innerText
        })
        return texts
      }, sel)
      browser.close()
      return response.json({ code: 200, data: kmsList, message: 'ok' })
    } catch (error) {
      return response.json({ code: 500, message: error.toString() })
    }
  }

  /**
   * 抓取瓜子二手车网车辆品牌信息
   * @param {object} request
   * @param {object} response
   */
  async guazi({ request, response }) {
    try {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto('https://www.guazi.com/hz/buy/')

      const BRANDS_INFO_SELECTOR =
        '.dd-all.clearfix.js-brand.js-option-hid-info'
      const brands = await page.evaluate(sel => {
        const ulList = Array.from($(sel).find('ul li p a'))
        const ctn = ulList.map(v => {
          return v.innerText.replace(/\s/g, '')
        })
        return ctn
      }, BRANDS_INFO_SELECTOR)

      browser.close()
      return response.json({ code: 200, data: brands, message: 'ok' })
    } catch (err) {
      return response.json({ code: 500, message: error.toString() })
    }
  }
}

module.exports = CrawlerController
