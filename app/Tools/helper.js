const dayjs = require('dayjs')

module.exports = {
  numToStr(num) {
    if (num > 26 && num < 0) {
      throw new Error('not found string')
    }
    return String.fromCharCode(64 + num)
  },

  generateNumArrByNum(num) {
    if (num < 1) {
      throw new Error('number error')
    }
    let arr = []
    for (let i = 1; i <= num; i++) {
      arr.push(i)
    }
    return arr
  },

  getTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}
