'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('user_name', 80).notNullable().unique().comment('用户名');
      table.string('phone', 40).notNullable().unique().comment('用户电话');
      table.string('email', 254).notNullable().unique().comment('用户邮箱');
      table.string('password', 60).notNullable().comment('用户密码');
      table.integer('company_id').notNullable().comment('用户所属公司ID');
      table
        .integer('status')
        .notNullable()
        .defaultTo(0)
        .comment('用户状态0：未激活，1：已激活');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
