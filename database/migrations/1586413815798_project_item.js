'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectItemSchema extends Schema {
  up() {
    this.create('project_items', (table) => {
      table.increments();
      table.integer('project_id').notNullable().comment('项目ID');
      table.integer('user_id').notNullable().comment('所属项目经理ID');
      table.string('item_name', 100).notNullable().comment('项目单项名称');
      table.string('executive_name', 40).notNullable().comment('执行人名字');
      table.string('executive_phone', 40).notNullable().comment('执行人手机号');
      table.decimal('need_days', 10, 2).notNullable().comment('所需时长');
      table.decimal('need_amount', 10, 2).notNullable().comment('所需金额');
      table
        .decimal('paid_amount', 10, 2)
        .notNullable()
        .defaultTo(0)
        .comment('已支付金额');
      table
        .integer('payment_status')
        .notNullable()
        .defaultTo(0)
        .comment('项目单项资金结算状态0：未结算，1：部分结算，2：已结清');
      table.timestamps();
    });
  }

  down() {
    this.drop('project_items');
  }
}

module.exports = ProjectItemSchema;
