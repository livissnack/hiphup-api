'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserLoginLogSchema extends Schema {
  up() {
    this.create('user_login_logs', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unique().comment('用户ID');
      table.string('ip', 32).notNullable().comment('用户登录IP');
      table.string('user_agent', 255).notNullable().comment('客户端agent');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_login_logs');
  }
}

module.exports = UserLoginLogSchema;
