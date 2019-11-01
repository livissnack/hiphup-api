'use strict'

const axios = use('axios')
const { randomString } = require('../../Tools/helper')

class TestController {
  async index() {
    return randomString(8, { letters: true, numbers: true, specials: false })
  }

  /**
   * 抓取各类新闻
   * @param {object} request
   * @param {object} response
   */
  async news({ request, response }) {
    const supports = ['toutiao', 'baidu', 'tencent', 'sohu']
    const type = request.input('type')
    if (!supports.includes(type)) {
      return 'crawler news type error'
    }
    const { status, data } = await axios.get(
      'https://api.github.com/users/livissnack'
    )
    return response.json(data)
  }
}

module.exports = TestController
