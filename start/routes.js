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

Route.get('test', 'TestController.index')

Route.group(() => {
  Route.get(`crawler/news`, 'CrawlerController.news')
  Route.get(`crawler/screenshot`, 'CrawlerController.screenshot')
  Route.get(`crawler/guazi`, 'CrawlerController.guazi')
  Route.get(`crawler/kms`, 'CrawlerController.kms')

  Route.post('import', 'ExcelController.import')
  Route.get('export', 'ExcelController.export')
}).prefix(`api/${ApiVersion}`)
