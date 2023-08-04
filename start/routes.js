'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const ApiVersion = 'v1.0';
const Route = use('Route');

Route.get('/', 'IndexController.index');

Route.get('gt/register-click', 'CaptchaController.valid');
Route.get('test', 'TestController.huaben');
Route.get('qrcode', 'QrcodeController.index');

Route.group(() => {
  Route.get(`crawler/news`, 'CrawlerController.news');
  Route.get(`crawler/kms`, 'CrawlerController.kms');
  Route.get(`crawler/guazi`, 'CrawlerController.guazi');
  Route.get(`crawler/douban`, 'CrawlerController.douban');
  Route.get(`crawler/bing`, 'CrawlerController.bing');
  Route.get(`crawler/jiameixian`, 'CrawlerController.jiameixian');
  Route.get(`crawler/fucai`, 'CrawlerController.fucai');
  Route.get(`crawler/proxy`, 'CrawlerController.proxy');
  Route.get(`crawler/huangli`, 'CrawlerController.huangli');

  Route.post('import', 'ExcelController.import');
  Route.get('export', 'ExcelController.export');

  Route.get('short_url', 'ShortUrlController.create');
  Route.post('short_url', 'ShortUrlController.store');
  Route.get('short_url/:flake_id', 'ShortUrlController.redirect');

  Route.get('live/douyu', 'LiveController.douyu');
  Route.get('live/huya', 'LiveController.huya');
  Route.get('live/huomao', 'LiveController.huomao');
  Route.get('live/huajiao', 'LiveController.huajiao');
  Route.get('live/zhanqi', 'LiveController.zhanqi');
  Route.get('live/yy', 'LiveController.yy');
  Route.get('live/bilibili', 'LiveController.bilibili');
  Route.get('live/douyin', 'LiveController.douyin');
  Route.get('live/qqlive', 'LiveController.qqlive');

  Route.get('analyze/douyin', 'ShortVideoController.douyin');
  Route.get('util/douyin', 'UtilController.douyin_redirect');
  Route.get('analyze/kuaishou', 'ShortVideoController.kuaishou');
  // Route.get('analyze/xigua', 'ShortVideoController.xigua');
  Route.get('analyze/bilibili', 'ShortVideoController.bilibili');

  Route.any('tran/youdao', 'TranslateController.youdao');

  Route.any('avoid/travel', 'CovidController.travel');
}).prefix(`api/${ApiVersion}`);
