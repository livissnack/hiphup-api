'use strict'

const FlakeId = use('flake-idgen')
const Intformat = use('biguint-format')
const ShortUrl = use('App/Models/ShortUrl')

class ShortUrlController {
  async create({ response }) {
    const flakeIdGen = new FlakeId()
    const flakeId = Intformat(flakeIdGen.next(), 'hex')
    return response.json({
      status: 'success',
      msg: '生成成功',
      data: flakeId
    })
  }

  async store({ request, response }) {
    const { flake_id, target_url } = request.only(['flake_id', 'target_url'])
    try {
      const shortUrl = new ShortUrl()
      shortUrl.flake_id = flake_id
      shortUrl.target_url = target_url
      const result = await shortUrl.save()
      return response.json({
        status: 'success',
        msg: '保存成功',
        data: result
      })
    } catch (error) {
      return response.json({
        status: 'failure',
        msg: '保存失败',
        data: error.toString()
      })
    }
  }

  async redirect({ params, response }) {
    const { flake_id } = params
    const shortUrl = await ShortUrl.findBy('flake_id', flake_id)
    if (parseInt(shortUrl.status) === 0) {
      return response.redirect(shortUrl.target_url, false, 301)
    }
  }
}

module.exports = ShortUrlController
