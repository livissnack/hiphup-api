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
      const type = request.input('type', 'baidu')

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
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '–disable-gpu',
          '–disable-dev-shm-usage',
          '–no-first-run',
          '–no-zygote',
          '–single-process'
        ]
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
          const APNEWS_SELECTED = '.cards FeedCard Component-headline-0-2-29'
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
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '–disable-gpu',
          '–disable-dev-shm-usage',
          '–no-first-run',
          '–no-zygote',
          '–single-process'
        ]
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
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '–disable-gpu',
          '–disable-dev-shm-usage',
          '–no-first-run',
          '–no-zygote',
          '–single-process'
        ]
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
    } catch (error) {
      return response.json({ code: 500, message: error.toString() })
    }
  }

  /**
   * 抓取淘宝商品信息
   * @param {*} param0
   */
  async taobao({ request, response }) {
    try {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()
      await page.goto(
        'https://www.taobao.com/markets/3c/tbdc?spm=a21bo.2017.201867-links-3.52.5af911d9AIDAUY'
      )
      console.log('页面加载完毕')
      for (let i = 1; i <= 5; i++) {
        const pageInput = await page.$(`.J_Input[type='number']`)
        const submit = await page.$('.J_Submit')
        await pageInput.type('' + i)
        await submit.click()
        await page.waitFor(2500)
        console.clear()
        console.log('页面数据加载完毕')

        const list = await page.evaluate(() => {
          const writeDataList = []
          let itemList = document.querySelectorAll('.item.J_MouserOnverReq')
          for (let item of itemList) {
            let writeData = {}
            // 找到商品图片的地址
            let img = item.querySelector('img')
            writeData.picture = img.src

            // 找到商品的链接
            let link = item.querySelector('.pic-link.J_ClickStat.J_ItemPicA')
            writeData.link = link.href

            // 找到商品的价格，默认是string类型 通过~~转换为整数number类型
            let price = item.querySelector('strong')
            writeData.price = ~~price.innerText

            // 找到商品的标题，淘宝的商品标题有高亮效果，里面有很多的span标签，不过一样可以通过innerText获取文本信息
            let title = item.querySelector('.title>a')

            writeData.title = title.innerText

            // 将这个标签页的数据push进刚才声明的结果数组
            writeDataList.push(writeData)
          }
          // 当前页面所有的返回给外部环境
          return writeDataList
        })
        console.log(list)
        await page.waitFor(2500)
      }
    } catch (error) {
      return response.json({ code: 500, message: error.toString() })
    } finally {
      process.exit(0)
    }
  }

  async douban({ request, response }) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '–disable-gpu',
        '–disable-dev-shm-usage',
        '–no-first-run',
        '–no-zygote',
        '–single-process'
      ]
    })
    const page = await browser.newPage()
    await page.goto('https://movie.douban.com/cinema/nowplaying/beijing/')
    const result = await page.evaluate(() => {
      const items = document.querySelectorAll(
        '#nowplaying > div.mod-bd > ul >li'
      )
      const links = []
      if (items.length >= 1) {
        items.forEach(item => {
          const data = Array.from(item.attributes)
          const link = {}
          data.forEach(v => {
            link[v.nodeName] = v.value
          })
          const a = item.querySelector('.poster > a')
          const img = a.querySelector('img')
          link.href = a.getAttribute('href')
          link.src = img.getAttribute('src')
          links.push({
            ...link
          })
        })
      }
      return links
    })
    await browser.close()
    return response.json({ code: 200, data: result, message: 'ok' })
  }
}

module.exports = CrawlerController
