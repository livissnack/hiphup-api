'use strict';

const puppeteer = use('puppeteer');
const { egg_combine_jiameixian, group_arr } = require('../../Tools/helper');

class CrawlerController {
  /**
   * 抓取各类新闻
   * @param {object} request
   * @param {object} response
   */
  async news({ request, response }) {
    try {
      const type = request.input('type', 'baidu');

      const urlMap = new Map([
        ['baidu', 'http://news.baidu.com'],
        ['toutiao', 'https://www.toutiao.com'],
        ['tencent', 'https://news.qq.com'],
        ['yahoo', 'https://www.yahoo.com/news'],
        ['apnews', 'https://www.apnews.com'],
        ['qichun', 'http://www.qichun.gov.cn/'],
        ['default', 'http://news.baidu.com'],
      ]);

      const gotoUrl = urlMap.get(type);

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
      const page = await browser.newPage();

      await page.goto(gotoUrl);

      let list = [];
      switch (type) {
        case 'baidu':
          const BAIDU_SELECTED = '.hotnews ul li strong a';
          list = await page.evaluate((BAIDU_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(BAIDU_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, BAIDU_SELECTED);
          break;

        case 'toutiao':
          const TOUTIAO_SELECTED = 'feed-infinite-wrapper ul li a';
          list = await page.evaluate((TOUTIAO_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(TOUTIAO_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, TOUTIAO_SELECTED);
          break;

        case 'tencent':
          const TENCENT_SELECTED = '.list li .detail h3 a';
          list = await page.evaluate((TENCENT_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(TENCENT_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, TENCENT_SELECTED);
          break;

        case 'yahoo':
          const YAHOO_SELECTED = '#YDC-Stream ul li h3 a';
          list = await page.evaluate((YAHOO_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(YAHOO_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, YAHOO_SELECTED);
          break;

        case 'apnews':
          const APNEWS_SELECTED = '.cards FeedCard Component-headline-0-2-29';
          list = await page.evaluate((APNEWS_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(APNEWS_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, APNEWS_SELECTED);
          break;

        case 'qichun':
          const QICHUN_SELECTED = '.xwlist ul li a';
          list = await page.evaluate((QICHUN_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(QICHUN_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.innerText,
              };
            });
            return texts;
          }, QICHUN_SELECTED);
          break;

        default:
          break;
      }

      browser.close();
      return response.json({ code: 200, data: list, message: 'ok' });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
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
          '–single-process',
        ],
      });
      const page = await browser.newPage();

      await page.goto(
        'https://gist.github.com/CHEF-KOCH/29cac70239eed583ad1c96dcb6de364b'
      );

      const sel = '#file-kms-md-readme article ul li';
      const kmsList = await page.evaluate((sel) => {
        let elements = Array.from(document.querySelectorAll(sel));
        let texts = elements.map((element) => {
          return element.innerText;
        });
        return texts;
      }, sel);
      browser.close();
      return response.json({ code: 200, data: kmsList, message: 'ok' });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
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
          '–single-process',
        ],
      });
      const page = await browser.newPage();

      await page.goto('https://www.guazi.com/hz/buy/');

      const BRANDS_INFO_SELECTOR =
        '.dd-all.clearfix.js-brand.js-option-hid-info';
      const brands = await page.evaluate((sel) => {
        const ulList = Array.from($(sel).find('ul li p a'));
        const ctn = ulList.map((v) => {
          return v.innerText.replace(/\s/g, '');
        });
        return ctn;
      }, BRANDS_INFO_SELECTOR);

      browser.close();
      return response.json({ code: 200, data: brands, message: 'ok' });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  /**
   * 抓取豆瓣电影资源信息
   * @param {object} request
   * @param {object} response
   */
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
        '–single-process',
      ],
    });
    const page = await browser.newPage();
    await page.goto('https://movie.douban.com/cinema/nowplaying/beijing/');
    const result = await page.evaluate(() => {
      const items = document.querySelectorAll(
        '#nowplaying > div.mod-bd > ul >li'
      );
      const links = [];
      if (items.length >= 1) {
        items.forEach((item) => {
          const data = Array.from(item.attributes);
          const link = {};
          data.forEach((v) => {
            link[v.nodeName] = v.value;
          });
          const a = item.querySelector('.poster > a');
          const img = a.querySelector('img');
          link.href = a.getAttribute('href');
          link.src = img.getAttribute('src');
          links.push({
            ...link,
          });
        });
      }
      return links;
    });
    await browser.close();
    return response.json({ code: 200, data: result, message: 'ok' });
  }

  /**
   * 抓取必应每日最新高清壁纸
   * @param {*} param0
   */
  async bing({ request, response }) {
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
          '–single-process',
        ],
      });
      const page = await browser.newPage();
      const url = `https://cn.bing.com`;

      await page.goto(url);

      const sel = '#bgImgProgLoad';

      const res = await page.$eval(sel, (e) => {
        return e.getAttribute('data-ultra-definition-src');
      });
      browser.close();
      const bgUrl = `${url}${res}`;
      return response.json({ code: 200, data: bgUrl, message: 'ok' });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async jiameixian({ request, response }) {
    const url = request.input(
      'url',
      'https://mp.weixin.qq.com/s/rJwKZHBz9AEBqz8K3s28ZA'
    );
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
          '–single-process',
        ],
      });

      const page = await browser.newPage();

      await page.goto(url);

      const WEIXIN_SELECTED =
        '#js_content > table > tbody > tr > td > p > span';

      const result = await page.evaluate((WEIXIN_SELECTED) => {
        let elements = Array.from(document.querySelectorAll(WEIXIN_SELECTED));
        let texts = elements.map((span) => {
          return {
            title: span.innerText,
          };
        });
        return texts;
      }, WEIXIN_SELECTED);

      const data = egg_combine_jiameixian(result);

      browser.close();
      return response.json({
        code: 200,
        data: group_arr(data, 5),
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async fucai({ request, response }) {
    const url = request.input(
      'url',
      'http://www.cwl.gov.cn'
    );
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
          '–single-process',
        ],
      });

      const page = await browser.newPage();

      await page.goto(url);

      const TARGET_SELECTED = '.kjGg';

      const shuangseqiu = await page.evaluate((TARGET_SELECTED) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > .kjgg01 > .kjggL > .kjxx > em`));
        let elements2 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > .kjgg01 > .kjggL > ul > li`));
        let texts1 = elements1.map((em) => {
          return {
            title: em.innerText,
          };
        });

        let texts2 = elements2.map((li) => {
          return {
            title: li.innerText,
          };
        });
        return {name: texts1[0]['title'], amount: texts1[1]['title'], result: texts2};
      }, TARGET_SELECTED);

  
      const data = {'shuangseqiu': shuangseqiu};

      browser.close();
      return response.json({
        code: 200,
        data: data,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }
}

module.exports = CrawlerController;
