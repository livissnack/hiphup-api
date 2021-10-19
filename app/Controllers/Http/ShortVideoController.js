'use strict'

const puppeteer = use('puppeteer');
const urlParse = require('url');
const axios = require('axios');
const {
  http_get,
  http_post,
  is_empty,
} = require('../../Tools/helper');
const iPhone = puppeteer.devices['iPhone X'];

class ShortVideoController {

  async douyin({ request, response }) {
    const url = request.input('url', 'https://v.douyin.com/eReT43D');
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    const parse_url = urlParse.parse(redirect_url, true).pathname
    const items_ids = parse_url.split("/")[3]

    const { data } = await http_get(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${items_ids}`);

    if (data.status_code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }
    let really_video_url = [data.item_list][0][0]['video']['play_addr']['url_list'][0]
    let really_cover_url = [data.item_list][0][0]['video']['origin_cover']['url_list'][0]
    let really_music_url = [data.item_list][0][0]['music']['play_url']['url_list'][0]
    let desc_text = [data.item_list][0][0]['desc']
    if (!is_empty(really_video_url)) {
      return response.json({
        code: 200,
        message: 'ok',
        data: {
          video_url: really_video_url.replace('playwm', 'play'),
          music_url: really_music_url,
          cover_url: really_cover_url,
          desc: desc_text
        }});
    }

    return response.json({ code: 500, message: 'douyin url parse failure!' });
  }

  async xigua({ request, response }) {
    const url = request.input('url', 'https://m.ixigua.com/video/6776683272152809997');
    // let { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    // return headers
    // const redirect_url = headers.location
    // return redirect_url

    const { data } = await http_get(url, {}, {
      'accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    });

    return data



    return response.json({ code: 500, message: 'douyin url parse failure!' });
  }



  async kuaishou({ request, response }) {
    const url = request.input('url', 'https://v.kuaishou.com/8Vt7oX');
    const { headers } = await axios.get(url, { maxRedirects: 0, validateStatus: null })
    const redirect_url = headers.location
    const parse_url = urlParse.parse(redirect_url, true).query
    const photoId = parse_url.photoId
    const post_params = {
      operationName: 'visionVideoDetail',
      variables: {
        "photoId": photoId,
        "page": 'detail'
      },
      query: `query visionVideoDetail($photoId: String, $type: String, $page: String) {
        visionVideoDetail(photoId: $photoId, type: $type, page: $page) {
          status
          type
          author {
            id
            name
            following
            headerUrl
            __typename
          }
          photo {
            id
            duration
            caption
            likeCount
            realLikeCount
            coverUrl
            photoUrl
            liked
            timestamp
            expTag
            llsid
            viewCount
            videoRatio
            stereoType
            __typename
          }
          tags {
            type
            name
            __typename
          }
          commentLimit {
            canAddComment
            __typename
          }
          llsid
          __typename
        }
      }`,
    }

    const handle_post_params = JSON.stringify(post_params)

    const { data } = await http_post(`https://video.kuaishou.com/graphql`, `${handle_post_params}`);

    if (data.status_code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }

    let really_url = data.visionVideoDetail.photo.photoUrl
    if (!is_empty(really_url)) {
      return response.json({
        code: 200,
        message: 'ok',
        data: really_url,
      });
    }

    return response.json({ code: 500, message: 'kuaishou url parse failure!' });
  }


  async bilibili({ request, response }) {
    try {
      const url = request.input('url', 'https://m.bilibili.com/video/av70663655.html?from=search');
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
      await page.goto(url); //进入指定网页


      const QICHUN_SELECTED = '#bilibiliPlayer > .mplayer > .mplayer-video-wrap > video';
      let result = await page.evaluate((QICHUN_SELECTED) => {
        let element = document.querySelector(QICHUN_SELECTED);
        console.log(element)
        return {
          url: element.src.trim(),
          title: element.poster,
        };
      }, QICHUN_SELECTED);

      browser.close();
      return response.json({ code: 200, data: result, message: 'ok' });
    } catch (error) {
      return response.json({ code: 500, message: error.toString() });
    }
  }
}

module.exports = ShortVideoController
