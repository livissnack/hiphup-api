'use strict'

const { randomString } = require('../../Tools/helper')

class TestController {
  async index() {
    return randomString(8, { letters: true, numbers: true, specials: false })
  }
}

module.exports = TestController
