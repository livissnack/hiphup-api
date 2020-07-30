'use strict';

class IndexController {
  async index({ request, response }) {
    return 'welcome to hiphup-api!';
  }
}

module.exports = IndexController;
