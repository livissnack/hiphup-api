'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShortUrlSchema extends Schema {
  up() {
    this.create('short_urls', (table) => {
      table.increments();
      table.string('flake_id', 8).unique().notNullable().comment('短链接码');
      table
        .string('target_url', 200)
        .unique()
        .notNullable()
        .comment('跳转目标url');
      table
        .integer('type')
        .notNullable()
        .defaultTo(0)
        .comment('类别0：系统，1：自定义');
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
