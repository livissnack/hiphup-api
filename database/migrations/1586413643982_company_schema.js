'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments();
      table
        .string('company_name', 80)
        .notNullable()
        .unique()
        .comment('公司名称');
      table.string('phone', 40).notNullable().unique().comment('公司电话');
      table.string('address', 254).notNullable().unique().comment('公司地址');
      table
        .integer('status')
        .notNullable()
        .defaultTo(0)
        .comment('用户状态0：未启用，1：已启用');
      table.timestamps();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompanySchema;
