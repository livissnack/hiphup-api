'use strict'
const Logger = use('Logger')
const { getTime } = require('../../Tools/helper')

class TestController {
  async index() {
    const currentTime = getTime()
    Logger.info(`this is code handle time is: ${currentTime}`)
  }
}

module.exports = TestController
