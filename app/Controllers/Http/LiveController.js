'use strict';

const url = use('url');
const {
  http_get,
  http_post,
  md5,
  timestamp,
  is_string,
  is_empty,
} = require('../../Tools/helper');
const url_helper = require('url');

class LiveController {
  async douyu({ request, response }) {
    const roomid = request.input('roomid', 1863767);
    const { data } = await http_get('https://web.sinsyth.com/lxapi/douyujx.x', {
      roomid: roomid,
    });
    if (data.state !== 'SUCCESS') {
      return response.json({ code: 500, message: 'no' });
    }
    let url_obj = url.parse(data.Rendata.link);
    url_obj.host = 'tx2play1.douyucdn.cn';
    url_obj.pathname = url_obj.pathname.replace('flv', 'm3u8');
    delete url_obj.search;
    let live_url = url.format(url_obj);
    return response.json({
      code: 200,
      message: 'ok',
      data: { live_url: live_url },
    });
  }

  async huya({ request, response }) {
    const roomid = request.input('roomid', 660000);
    const type = request.input('type', 'all');
    const { data } = await http_get(
      `https://m.huya.com/${roomid}`,
      {},
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      }
    );
    const url = /liveLineUrl = "(.*)"/.exec(data);
    // const url = /[-\w:/.]+\.m3u8/.exec(data);
    let live_url = `https:${url[1]}`;
    let url_params = url_helper.parse(live_url);
    url_params.host = type === 'tv' ? 'bd.hls.huya.com' : 'al.hls.huya.com';
    url_params.hostname = type === 'tv' ? 'bd.hls.huya.com' : 'al.hls.huya.com';
    live_url = `${url_params.protocol}//${url_params.host}${url_params.path}`;
    if (is_string(live_url)) {
      return response.json({
        code: 200,
        message: 'ok',
        data: { live_url: live_url },
      });
    }
    return response.json({ code: 500, message: 'no' });
  }

  async huomao({ request, response }) {
    const roomid = request.input('roomid', 517493);
    const { data } = await http_get(
      `https://www.huomao.com/mobile/mob_live/${roomid}`,
      {}
    );
    const videoids = data.match(/var stream = "([-\w:/.]+?)"/)[1];
    let time = timestamp();
    let token = md5(
      `${videoids}huomaoh5room${time}6FE26D855E1AEAE090E243EB1AF73685`
    );
    let params = {
      cdns: 1,
      streamtype: 'live',
      VideoIDS: videoids,
      from: 'huomaoh5room',
      time: time,
      token: token,
    };
    const res_data = await http_post(
      'https://www.huomao.com/swf/live_data',
      params
    );
    const live_data = res_data.data;
    if (live_data.roomStatus !== '1') {
      return response.json({ code: 500, message: 'no' });
    }
    const live_url = live_data.streamList[0]['list_hls'][0]['url'];
    return response.json({
      code: 200,
      message: 'ok',
      data: { live_url: live_url },
    });
  }

  async huajiao({ request, response }) {
    const roomid = request.input('roomid', 305241590);
    const { data } = await http_get(
      `https://h.huajiao.com/api/getFeedInfo?sid=${timestamp()}&liveid=${roomid}`,
      {}
    );
    if (data.errno !== 0 || is_empty(data.data.live)) {
      return response.json({ code: 500, message: 'no' });
    }
    let live_url = data.data.live.main;
    return response.json({
      code: 200,
      message: 'ok',
      data: { live_url: live_url },
    });
  }

  async zhanqi({ request, response }) {
    const roomid = request.input('roomid', 873076845);
    const { data } = await http_get(
      `https://m.zhanqi.tv/api/static/v2.1/room/domain/${roomid}.json`,
      {}
    );
    if (data.code !== 0 || is_empty(data.data.videoId)) {
      return response.json({ code: 500, message: 'no' });
    }
    let live_url = `https://dlhdl-cdn.zhanqi.tv/zqlive/${data.data.videoId}.flv`;
    return response.json({
      code: 200,
      message: 'ok',
      data: { live_url: live_url },
    });
  }

  async yy({ request, response }) {
    const roomid = request.input('roomid', 16777217);
    const { data } = await http_get(
      `http://interface.yy.com/hls/new/get/${roomid}/${roomid}/1200?source=wapyy&callback=jsonp3`
    );
    if (data.code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }
    return response.json({ code: 200, message: 'ok', data: data });
  }

  async bilibili({ request, response }) {
    const roomid = request.input('roomid', 22190208);
    const platform = request.input('platform', 'h5');
    if (!['h5', 'flash', 'web'].includes(platform)) {
      return response.json({ code: 500, message: 'platform not support' });
    }
    const { data } = await http_get(
      `https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomPlayInfo?room_id=${roomid}&play_url=1&mask=1&qn=4&platform=${platform}`,
      {},
      {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Auto-Unzip': true,
      }
    );
    if (data.code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }
    return response.json({
      code: 200,
      message: 'ok',
      data: { live_url: data.data.play_url.durl[0].url },
    });
  }

  async douyin({ request, response }) {
    const roomid = request.input('roomid', '6854736674899888909');
    const { data } = await http_get(
      `https://webcast-hl.amemv.com/webcast/room/reflow/info/?room_id=${roomid}&live_id=1`,
      {},
      {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Auto-Unzip': true,
      }
    );
    if (data.status_code !== 0) {
      return response.json({ code: 500, message: 'no' });
    }

    if ('stream_url' in data.data.room) {
      return response.json({
        code: 200,
        message: 'ok',
        data: data.data.room.stream_url.hls_pull_url,
      });
    }

    return response.json({ code: 200, message: 'no start play' });
  }
}

module.exports = LiveController;
