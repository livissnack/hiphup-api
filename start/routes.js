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

Route.on('/').render('welcome');

Route.get('test', 'TestController.index');
Route.get('qrcode', 'QrcodeController.index');

Route.group(() => {
  Route.get(`crawler/news`, 'CrawlerController.news');
  Route.get(`crawler/kms`, 'CrawlerController.kms');
  Route.get(`crawler/guazi`, 'CrawlerController.guazi');
  Route.get(`crawler/douban`, 'CrawlerController.douban');
  Route.get(`crawler/bing`, 'CrawlerController.bing');

  Route.post('import', 'ExcelController.import');
  Route.get('export', 'ExcelController.export');

  Route.get('short_url', 'ShortUrlController.create');
  Route.post('short_url', 'ShortUrlController.store');
  Route.get('short_url/:flake_id', 'ShortUrlController.redirect');
}).prefix(`api/${ApiVersion}`);
