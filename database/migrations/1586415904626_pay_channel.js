'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PayChannelSchema extends Schema {
  up() {
    this.create('pay_channels', (table) => {
      table.increments();
      table
        .string('channel_name', 40)
        .notNullable()
        .unique()
        .comment('支付渠道名称');
      table.string('code', 40).notNullable().unique().comment('支付渠道code');
      table
        .integer('status')
        .notNullable()
        .defaultTo(1)
        .comment('状态0：未启用，1：启用');
      table.timestamps();
    });
  }

  down() {
    this.drop('pay_channels');
  }
}

module.exports = PayChannelSchema;
