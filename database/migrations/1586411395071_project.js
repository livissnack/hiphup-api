'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments();
      table
        .string('project_name', 100)
        .unique()
        .notNullable()
        .comment('项目名称');
      table
        .string('project_address', 200)
        .notNullable()
        .comment('项目所在地址');
      table.string('owner_name', 60).notNullable().comment('业主名字');
      table.string('owner_phone', 40).notNullable().comment('业主手机号');
      table.string('design_name', 60).notNullable().comment('设计师名字');
      table.string('design_phone', 40).notNullable().comment('设计师手机号');
      table
        .integer('project_status')
        .notNullable()
        .defaultTo(0)
        .comment(
          '项目状态0：未启动，1：刚启动，2：进行中，3：快结束，4：已完成'
        );
      table
        .integer('project_progress')
        .notNullable()
        .defaultTo(0)
        .comment('项目进度');
      table.integer('user_id').notNullable().comment('所属哪个项目经理');
      table.integer('project_total_amount').notNullable().comment('项目总报价');
      table
        .integer('project_payment_status')
        .notNullable()
        .defaultTo(0)
        .comment('项目资金结算状态0：未结算，1：部分结算，2：已结清');
      table.string('remark', 255).comment('备注');
      table.timestamps();
    });
  }

  down() {
    this.drop('projects');
  }
}

module.exports = ProjectSchema;
