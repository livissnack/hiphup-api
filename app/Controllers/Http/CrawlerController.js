'use strict'

const fs = use('fs')
const axios = use('axios')
const Helpers = use('Helpers')
const puppeteer = use('puppeteer')

class CrawlerController {
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

  async test({ request, response }) {
    const browser = await puppeteer.launch({
      // executablePath: '../../../node_modules/puppeteer/.local-chromium/',
      timeout: 15000,
      ignoreHTTPSErrors: true,
      devtools: false,
      headless: true
    })
    const page = await browser.newPage()
    await page.goto('https://www.jianshu.com/u/40909ea33e50')
    await page.screenshot({
      path: 'jianshu.png',
      type: 'png',
      fullPage: true
      // 指定区域截图，clip和fullPage两者只能设置一个
      // clip: {
      //   x: 0,
      //   y: 0,
      //   width: 1000,
      //   height: 40
      // }
    })
    browser.close()
    return 'hello test'
  }

  async screenshot({ request, response }) {
    const { crawler_url, clip_params } = request.only([
      'crawler_url',
      'clip_params'
    ])
    console.log(crawler_url, clip_params)
    const browser = await puppeteer.launch({
      timeout: 15000,
      ignoreHTTPSErrors: true,
      devtools: false,
      headless: true
    })
    const page = await browser.newPage()
    await page.goto(crawler_url)
    const fileName = Math.random()
      .toString(36)
      .substr(2)
    const storePath = Helpers.resourcesPath(`crawlers/${fileName}.png`)
    let params = {
      path: storePath,
      type: 'png'
    }
    console.log(typeof clip_params, clip_params)

    if (
      Object.keys(clip_params).length === 0 ||
      (typeof clip_params === 'string' && clip_params === '{}')
    ) {
      params.fullPage = true
    } else {
      params.clip = clip_params
    }
    await page.screenshot(params)
    browser.close()
    return response.json('crawler success')
  }

  async guazi({ request, response }) {
    try {
      const browser = await puppeteer.launch({
        headless: true
      })
      const page = await browser.newPage()

      await page.goto('https://www.guazi.com/hz/buy/')

      // 获取页面标题
      let title = await page.title()

      // 获取汽车品牌
      const BRANDS_INFO_SELECTOR =
        '.dd-all.clearfix.js-brand.js-option-hid-info'
      const brands = await page.evaluate(sel => {
        const ulList = Array.from($(sel).find('ul li p a'))
        const ctn = ulList.map(v => {
          return v.innerText.replace(/\s/g, '')
        })
        return ctn
      }, BRANDS_INFO_SELECTOR)

      console.log('汽车品牌: ', JSON.stringify(brands))

      let writerStream1 = fs.createWriteStream('car_brands.json')
      writerStream1.write(JSON.stringify(brands, undefined, 2), 'UTF8')
      writerStream1.end()

      // 获取车源列表
      const CAR_LIST_SELECTOR = 'ul.carlist'
      const carList = await page.evaluate(sel => {
        const catBoxs = Array.from($(sel).find('li a'))
        const ctn = catBoxs.map(v => {
          const title = $(v)
            .find('h2.t')
            .text()
          const subTitle = $(v)
            .find('div.t-i')
            .text()
            .split('|')
          return {
            title: title,
            year: subTitle[0],
            milemeter: subTitle[1]
          }
        })
        return ctn
      }, CAR_LIST_SELECTOR)

      console.log(
        `总共${carList.length}辆汽车数据: `,
        JSON.stringify(carList, undefined, 2)
      )

      console.log('adsadsa0')
      // 将车辆信息写入文件
      let writerStream2 = fs.createWriteStream('car_info_list.json')
      writerStream2.write(JSON.stringify(carList, undefined, 2), 'UTF8')
      writerStream2.end()
      console.log('adsadsa1')

      browser.close()
      console.log('adsadsa2')
      return response.json({ carList: carList, brands: brands })
    } catch (err) {
      console.log(err)
      return response.json(err.toString())
    }
  }
}

module.exports = CrawlerController
