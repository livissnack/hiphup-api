'use strict';

const { random_str, two_color_ball } = require('../../Tools/helper');

class TestController {
  async index() {
    return random_str(8, { letters: true, numbers: true, specials: false });
  }
}

module.exports = TestController;
