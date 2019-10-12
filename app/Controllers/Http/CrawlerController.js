'use strict'
const axios = use('axios')

class CrawlerController {
  async baidu({ request, response }) {
    const { status, data } = await axios.get('https://api.github.com/users/livissnack')
    return response.json(data)
  }
}

module.exports = CrawlerController
