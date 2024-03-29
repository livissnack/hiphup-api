'use strict';

const puppeteer = use('puppeteer');
const parse = use('style-to-object');
const _ = use('lodash');
const iPhone = puppeteer.devices['iPhone X'];
const { egg_combine_jiameixian, group_arr, is_empty } = require('../../Tools/helper');

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
          const TOUTIAO_SELECTED = '.feed-card-article-l > a';
          list = await page.evaluate((TOUTIAO_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(TOUTIAO_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href.trim(),
                title: a.getAttribute('aria-label'),
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
          const YAHOO_SELECTED = '.stream-title';
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
          const APNEWS_SELECTED = '.Link';
          list = await page.evaluate((APNEWS_SELECTED) => {
            let elements = Array.from(
              document.querySelectorAll(APNEWS_SELECTED)
            );
            let texts = elements.map((a) => {
              return {
                url: a.href,
                title: a.innerText,
              };
            });
            return texts;
          }, APNEWS_SELECTED);
          break;

        case 'qichun':
          const QICHUN_SELECTED = '.bt-tab-con ul li a';
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

      const sel = '.img_cont';

      let style = await page.$eval(sel, (e) => {
        return e.getAttribute('style');
      });
      let imgSrc = parse(style)['background-image'];
      let reg = /[^\(\)]+(?=\))/g;
      let res = imgSrc.match(reg)[0];
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

      const TARGET_SELECTED = '.notice-content';

      const shuangseqiu = await page.evaluate((TARGET_SELECTED) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > .notice-content-title > span`));
        let elements2 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > .qiu > .qiu-item`));
        let texts1 = elements1.map((em) => {
          return {
            title: em.innerText,
          };
        });

        let texts2 = elements2.map((div) => {
          return {
            title: div.innerText,
          };
        });
        return {name: texts1[0]['title'], amount: texts1[1]['title'], result: texts2.slice(0, 7)};
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

  async proxy({ request, response }) {
    const url = request.input(
      'url',
      'http://free-proxy.cz'
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
          // '--proxy-server=http://150.129.54.111:6667'
        ],
      });

      const page = await browser.newPage();

      await page.goto(url);

      const TARGET_SELECTED = '#proxy_list tbody tr';

      const proxy_list = await page.evaluate((TARGET_SELECTED) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > td`));
        let texts1 = elements1.map((em) => {
          let row_data = em.innerText;
          return {
            row_data
          };
        });

        return {name: texts1};
      }, TARGET_SELECTED);


      const data = {'proxy_list': proxy_list};

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

  async huangli({ request, response }) {
    const url = request.input(
      'url',
      'http://m.laohuangli.net/'
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

      const TARGET_SELECTED = '.suit_cont';

      const huangli_list = await page.evaluate((TARGET_SELECTED) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED} > p > span`));

        let texts1 = elements1.map((em) => {
          let row_data = em.innerText;
          return {
            row_data
          };
        });

        return {texts1};
      }, TARGET_SELECTED);

      const TARGET_SELECTED1 = '.taboo_cont';

      const huangli_list1 = await page.evaluate((TARGET_SELECTED1) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED1} > p > span`));

        let texts1 = elements1.map((em) => {
          let row_data = em.innerText;
          return {
            row_data
          };
        });

        return {texts1};
      }, TARGET_SELECTED1);

      const TARGET_SELECTED2 = '.date_suit_table';

      const huangli_list2 = await page.evaluate((TARGET_SELECTED2) => {
        let elements1 = Array.from(document.querySelectorAll(`${TARGET_SELECTED2} > tbody > tr > td > p`));

        let texts1 = elements1.map((em) => {
          let row_data = em.innerText;
          return {
            row_data
          };
        });

        return {texts1};
      }, TARGET_SELECTED2);

      const data = {
        suitable: huangli_list.texts1,
        taboo: huangli_list1.texts1,
        luck_ferocious: [huangli_list2.texts1][0],
      };

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

  async eslist({ request, response }) {
    const page = request.input('page', 1)
    const url = request.input(
      'url',
      `https://www.right.com.cn/forum/forum-182-${page}.html`
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

      const BAIDU_SELECTED = '#moderate > #threadlisttableid > tbody > tr > th > .xst';
      let list = await page.evaluate((BAIDU_SELECTED) => {
        let elements = Array.from(
          document.querySelectorAll(BAIDU_SELECTED)
        );
        let texts = elements.map((em, index) => {
          return {
            url: em.href,
            title: em.innerText,
          };
        });
        return texts;
      }, BAIDU_SELECTED);

      browser.close();

      list = _.drop(list, 7)
      return response.json({
        code: 200,
        data: list,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async v2ex({ request, response }) {
    const page = request.input('page', 1)
    const url = request.input(
      'url',
      `https://www.v2ex.com/?tab=qna`
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

      const BAIDU_SELECTED = '#Main >.box > .cell > table > tbody > tr > td > .item_title > .topic-link';
      let list = await page.evaluate((BAIDU_SELECTED) => {
        let elements = Array.from(
          document.querySelectorAll(BAIDU_SELECTED)
        );
        let texts = elements.map((em, index) => {
          return {
            url: em.href,
            title: em.innerText,
          };
        });
        return texts;
      }, BAIDU_SELECTED);

      browser.close();

      list = _.drop(list, 7)
      return response.json({
        code: 200,
        data: list,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async tv({ request, response }) {
    const url = request.input('url','http://www.wfcmw.cn/wfrtv/wlpd_zb/');
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

      const BAIDU_SELECTED = '.con > .wl-liebiao > li > img';
      let list = await page.evaluate((BAIDU_SELECTED) => {
        let elements = Array.from(
          document.querySelectorAll(BAIDU_SELECTED)
        );
        let texts = elements.map((em) => {
          return {
            tvlogo: em.src.trim(),
            m3u8: em.getAttribute('data-url'),
          };
        });
        return texts;
      }, BAIDU_SELECTED);

      browser.close();
      return response.json({
        code: 200,
        data: list,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async hktv({ request, response }) {
    const url = request.input('url','https://iptv222.com/?tid=gt');
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

      await page.emulate(iPhone); //模拟iphone6打开页面
      await page.goto(url);

      const BAIDU_SELECTED = '.ui-content > ul > li > div > div > a';
      let list = await page.evaluate((BAIDU_SELECTED) => {
        let elements = Array.from(
          document.querySelectorAll(BAIDU_SELECTED)
        );
        let texts = elements.map((em) => {
          return {
            play_url: em.href,
            name: em.innerText,
          };
        });
        return texts;
      }, BAIDU_SELECTED);

      browser.close();
      return response.json({
        code: 200,
        data: list,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }

  async lztv({ request, response }) {
    const url = request.input('url', 'http://lzizy.com/index.php/vod/type/id/13.html');
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

      const BAIDU_SELECTED = '.videoContent > li > .videoName';
      let list = await page.evaluate((BAIDU_SELECTED) => {
        let elements = Array.from(
          document.querySelectorAll(BAIDU_SELECTED)
        );
        let texts = elements.map((em) => {
          return {
            play_url: em.href,
            name: em.innerText,
          };
        });
        return texts;
      }, BAIDU_SELECTED);

      browser.close();
      return response.json({
        code: 200,
        data: list,
        message: 'ok',
      });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }
}

module.exports = CrawlerController;
