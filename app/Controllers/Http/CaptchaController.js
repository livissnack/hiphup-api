'use strict'

class CaptchaController {
  async valid({ request, response }) {
    const {g_type, s_scene} = request.only(['g_type', 'g_scene']);
    return response.json({code: 1, msg: '验证成功', data: {
      success: 1,
      gt: '29e4e065c7ba05ff77ba896e5d577f89',
      challenge: 'bd26076b3afe9ed3c17738f3f8a7eec7',
      new_captcha: 1
    }})
  }
}

module.exports = CaptchaController
