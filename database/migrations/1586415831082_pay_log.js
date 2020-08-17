'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PayLogSchema extends Schema {
  up() {
    this.create('pay_logs', (table) => {
      table.increments();
      table.integer('channel_id').notNullable().comment('支付渠道ID');
      table.string('channel_name', 40).notNullable().comment('支付渠道名称');
      table.integer('user_id').notNullable().comment('支付人ID');
      table.string('user_name', 40).notNullable().comment('支付人姓名');
      table.string('receive_name', 40).notNullable().comment('接收款项人姓名');
      table.integer('amount').notNullable().comment('支付金额');
      table.bigInteger('order_sn').notNullable().comment('支付单号');
      table.string('remark', 255).notNullable().comment('支付备注');
      table.timestamps();
    });
  }

  down() {
    this.drop('pay_logs');
  }
}

module.exports = PayLogSchema;
