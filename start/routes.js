'use strict'

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
const ApiVersion = 'v1.0'
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('test', 'CrawlerController.test')
Route.get(`/${ApiVersion}/crawler/news`, 'CrawlerController.news')
Route.get(`/${ApiVersion}/crawler/screenshot`, 'CrawlerController.screenshot')
Route.get(`/${ApiVersion}/crawler/guazi`, 'CrawlerController.guazi')

Route.post('import','ExcelController.import')
Route.get('export','ExcelController.export')
