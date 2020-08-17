'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class WechatMpSchema extends Schema {
  up() {
    this.create('wechat_mps', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unique().comment('用户ID');
      table.string('open_id', 32).notNullable().comment('微信open_id');
      table.timestamps();
    });
  }

  down() {
    this.drop('wechat_mps');
  }
}

module.exports = WechatMpSchema;
