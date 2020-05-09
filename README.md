[![Heroku App Status](http://heroku-shields.herokuapp.com/hiphup-api)](https://hiphup-api.herokuapp.com)
[![Build Status](https://travis-ci.org/livissnack/hiphup-api.svg?branch=master)](https://travis-ci.org/livissnack/hiphup-api)
![GitHub All Releases](https://img.shields.io/github/downloads/livissnack/hiphup-api/total)
![GitHub repo size](https://img.shields.io/github/repo-size/livissnack/hiphup-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/livissnack/hiphup-api)
![GitHub](https://img.shields.io/github/license/livissnack/hiphup-api)

# Hiphup-api 项目

这是一个构建于 AdonisJs 上的接口项目，主要用于日常工作中的开发测试！

1. 将.env 文件中的变量全部配置在 Config Vars 里面
2. 注意需要添加一个 ENV_SILENT=true 的变量，用于屏蔽.env 文件报错
3. 使用免费的 Heroku 进行部署
4. 使用 Heroku 的免费数据库 Postgres
5. 域名地址：https://hiphup-api.herokuapp.com
6. 用于研究各种有意义的数据，封装成接口，便于使用

## 一、安装

首先克隆代码到本地目录（`git clone git@github.com:livissnack/hiphup-api.git`），然后执行如下命令：

```bash
cd hiphup-api
npm install
npm start
```

## 二、部署

注册[heroku](https://www.heroku.com)账号，创建 app，为 app 添加附加组件数据库 Postgres。
选择部署方法为：Githup Connected，连接授权到 githup，开启自动部署，并绑定 travis-ci 集成
测试。然后每次修改代码后，git push，先集成测试，再自动部署到 Heroku 环境。

```bash
git add .
git commit -am 'commit content'
git push
```

## 三、功能明细

### API 列表

| Id  |         Url          |             Name             | Status |
| :-- | :------------------: | :--------------------------: | -----: |
| 1   | /v1.0/crawler/news   |           聚合新闻            | active |
| 2   | /v1.0/crawler/kms    | W10 和 office 激活服务器地址   | active |
| 3   | /v1.0/crawler/guazi  |            瓜子网             | active |
| 4   | /v1.0/crawler/douban |           豆瓣电影             | active |
| 5   | /v1.0/crawler/douyu  |           斗鱼直播源           | active |
| 6   | /v1.0/crawler/huya   |           虎牙直播源           | active |
| 7   | /v1.0/crawler/huomao |           火猫直播源           | active |
| 8   | /v1.0/crawler/huajiao|           花椒直播源           | active |
| 9   | /v1.0/crawler/zhanqi |           战旗直播源           | active |

### API 接口

#### 1、抓取聚合新闻

目前有 5 种新闻类别，对应的 type 是：

- 百度：baidu
- 头条: toutiao
- 腾讯: tencent
- 雅虎: yahoo
- 美联社: apnews
- 蕲春政府: qichun
- 默认: baidu

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/news?type=baidu](https://hiphup-api.herokuapp.com/api/v1.0/crawler/news?type=baidu)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": [
    {
      "url": "http://news.cctv.com/2019/10/22/ARTIDWTxj5XVjoPGkkhn3QkR191022.shtml",
      "title": "微视频 | 勇“网”直前"
    },
    {
      "url": "http://www.xinhuanet.com/politics/leaders/2019-10/21/c_1125133417.htm",
      "title": "开启法治中国新时代"
    },
    {
      "url": "http://news.cctv.com/2019/10/21/ARTIAnkA0qXA8WWn5Ahkqt3H191021.shtml",
      "title": "用科技助力脱贫攻坚和乡村振兴"
    },
    {
      "url": "http://www.xinhuanet.com/politics/leaders/2019-10/22/c_1125135786.htm",
      "title": "习近平向2019年太原能源低碳发展论坛致贺信"
    }
  ],
  "message": "ok"
}
```

---

#### 2、抓取 kms 激活服务器地址

- 注意：windows 系统和 office 办公软件激活，激活时长 60 天
- 说明：支持 windows8/9/10,office2016/2017/2018

```
slmgr /ipk ххххх- ххххх – ххххх – ххххх – ххххх

slmgr /skms [serverhere]:1688

slmgr /ato
```

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/kms](https://hiphup-api.herokuapp.com/api/v1.0/crawler/kms)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": [
    "kms.digiboy.ir",
    "hq1.chinancce.com",
    "54.223.212.31",
    "kms.cnlic.com",
    "kms.chinancce.com",
    "kms.ddns.net"
  ],
  "message": "OK"
}
```

#### 3、抓取瓜子二手车网车辆信息

- 说明：车辆品牌信息

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/guazi](https://hiphup-api.herokuapp.com/api/v1.0/crawler/guazi)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": [
    "奥迪",
    "阿尔法·罗密欧",
    "阿斯顿·马丁",
    "Alpina",
    "安驰",
    "ARCFOX",
    "ACSchnitzer",
    "本田",
    "奔驰",
    "别克",
    "宝马",
    "宝骏",
    "标致",
    "..."
  ],
  "message": "ok"
}
```

#### 4、抓取豆瓣电影

- 说明：豆瓣电影信息抓取

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/douban](https://hiphup-api.herokuapp.com/api/v1.0/crawler/douban)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": [
    {
      "id": "3097572",
      "class": "list-item",
      "data-title": "双子杀手",
      "data-score": "7.1",
      "data-star": "35",
      "data-release": "2019",
      "data-duration": "117分钟",
      "data-region": "美国 中国大陆",
      "data-director": "李安",
      "data-actors": "威尔·史密斯 / 玛丽·伊丽莎白·温斯特德 / 克里夫·欧文",
      "data-category": "nowplaying",
      "data-enough": "True",
      "data-showed": "True",
      "data-votecount": "92122",
      "data-subject": "3097572",
      "href": "https://movie.douban.com/subject/3097572/?from=playing_poster",
      "src": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2570906505.webp"
    }
  ],
  "message": "ok"
}
```

#### 5、抓取斗鱼直播源

- 说明：斗鱼直播流地址抓取(需要房间号roomid)

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/douyu](https://hiphup-api.herokuapp.com/api/v1.0/crawler/douyu)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": {
    "live_url": "http://tx2play1.douyucdn.cn/live/1863767rkpl_2000p.m3u8"
  },
  "message": "ok"
}
```

#### 6、抓取虎牙直播源

- 说明：虎牙直播流地址抓取(需要房间号roomid)

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/huya](https://hiphup-api.herokuapp.com/api/v1.0/crawler/huya)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": {
    "live_url": "https://aldirect.rtmp.huya.com/src/1259515661837-1259515661837-4682562792811659264-2519031447130-10057-A-0-1_8000.m3u8"
  },
  "message": "ok"
}
```

#### 7、抓取火猫直播源

- 说明：火猫直播流地址抓取(需要房间号roomid)

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/huomao](https://hiphup-api.herokuapp.com/api/v1.0/crawler/huomao)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": {
    "live_url": "http://live-tx-hls.huomaotv.cn/live/6cdwFL24526_480.m3u8?t=1589018569&r=491569477134&stream=6cdwFL24526&rid=oubvc2y3v&token=72fe67dd4ed93f07b18e713774216311&url=http%3A%2F%2Flive-tx-hls.huomaotv.cn%2Flive%2F6cdwFL24526_480.m3u8&from=huomaoh5room"
  },
  "message": "ok"
}
```

#### 8、抓取花椒直播源

- 说明：花椒直播流地址抓取(需要房间号roomid)

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/huajiao](https://hiphup-api.herokuapp.com/api/v1.0/crawler/huajiao)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": {
    "live_url": "http://al2-hls.live.huajiao.com/live_huajiao_v2/_LC_AL2_non_21446230115890043261088281_SX/index.m3u8"
  },
  "message": "ok"
}
```

#### 9、抓取战旗直播源

- 说明：战旗直播流地址抓取(需要房间号roomid)

##### Request

- Method: **GET**
- URL:
  - crawler url: [/api/v1.0/crawler/zhanqi](https://hiphup-api.herokuapp.com/api/v1.0/crawler/zhanqi)
- Headers：
- Body:

```

```

##### Response

- Body

```json
{
  "code": 200,
  "data": {
    "live_url": "https://dlhdl-cdn.zhanqi.tv/zqlive/282636_QUZqw.flv"
  },
  "message": "ok"
}
```

## 四、版权所有（[LivisSnack MIT](./LICENSE)）
