'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShortUrlSchema extends Schema {
  up() {
    this.create('short_urls', (table) => {
      table.increments();
      table.string('flake_id', 40).unique().notNullable().comment('url唯一ID');
      table
        .string('target_url', 60)
        .unique()
        .notNullable()
        .comment('跳转目标url');
      table
        .integer('status')
        .notNullable()
        .defaultTo(1)
        .comment('重定向状态0：启用，1：禁用');
      table.timestamps();
    });
  }

  down() {
    this.drop('short_urls');
  }
}

module.exports = ShortUrlSchema;
