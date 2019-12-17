'use strict';

const _ = use('lodash');
const { randomString } = require('../../Tools/helper');

class TestController {
  async index() {
    return _.uniqueId();
    return randomString(8, { letters: true, numbers: true, specials: false });
  }
}

module.exports = TestController;
