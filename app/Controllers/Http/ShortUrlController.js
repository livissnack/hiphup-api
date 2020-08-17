'use strict';

const Event = use('Event');
const ShortUrl = use('App/Models/ShortUrl');
const { random_str } = require('../../Tools/helper');

class ShortUrlController {
  async create() {
    const flakeId = random_str(8, {
      letters: true,
      numbers: true,
      specials: false,
    });
    return flakeId;
  }

  async store({ request }) {
    const { flake_id, target_url } = request.only(['flake_id', 'target_url']);
    try {
      const shortUrl = new ShortUrl();
      shortUrl.flake_id = flake_id;
      shortUrl.target_url = target_url;
      const result = await shortUrl.save();
      return result;
    } catch (error) {
      return error.toString();
    }
  }

  async redirect({ params, request, response }) {
    const { flake_id } = params;
    const ip = request.ip();
    const user_agent = request.header('User-Agent');

    const shortUrl = await ShortUrl.findBy('flake_id', flake_id);
    if (parseInt(shortUrl.status) === 0) {
      let requestInfo = {
        ip: ip,
        user_agent: user_agent,
        id: shortUrl.id
      }
      Event.fire('new::click_short_url', requestInfo);
      return response.redirect(shortUrl.target_url, false, 301);
    }
  }
}

module.exports = ShortUrlController;
