'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShortUrlSchema extends Schema {
  up() {
    this.create('short_url_logs', (table) => {
      table.increments();
      table.string('ip', 32).notNullable().comment('访问的ip地址');
      table
        .text('user_agent')
        .notNullable()
        .comment('请求agent信息');
      table
        .integer('short_url_id')
        .notNullable()
        .defaultTo(0)
        .comment('短链ID');
      table.timestamps();
    });
  }

  down() {
    this.drop('short_urls');
  }
}

module.exports = ShortUrlSchema;
