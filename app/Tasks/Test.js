'use strict'

const Task = use('Task')

class Test extends Task {
  static get schedule () {
    return '*/1 * * * * *'
  }

  async handle () {
    console.log('adad')
    this.info('Task Test handle')
  }
}

module.exports = Test
