'use strict'

const Task = use('Task')
const exec = require('child_process').exec

class UpdateCertify extends Task {
  static get schedule() {
    return '30 03 01 */3 *'
  }

  async handle() {
    const domain = 'hiphup.cn'
    const cmdStr = `bash ~/.acme.sh/acme.sh --issue --dns dns_ali -d ${domain} -d "*.${domain}" && cp -rf /root/.acme.sh/${domain} /etc/nginx/ssl && nginx -s reload`
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        this.error('update ssl ceritify failure: ', error)
      } else {
        this.info('update ssl task handle log', stdout)
      }
    })
    this.info('Task UpdateCertify handle')
  }
}

module.exports = UpdateCertify
