const dayjs = require('dayjs');
const axios = require('axios');

module.exports = {
  async httpGet(url, params) {
    return axios({
      method: 'get',
      url: url,
      data: params,
      headers: { key: 'foobar' }
    });
  },

  numToStr(num) {
    if (num > 26 && num < 0) {
      throw new Error('not found string');
    }
    return String.fromCharCode(64 + num);
  },

  generateNumArrByNum(num) {
    if (num < 1) {
      throw new Error('number error');
    }
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  },

  getTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },

  /**
   * 生成随机字符串
   * @param {number} length
   * @param {object} options {specials: ':;', numbers: false, letters: 'ABCDEFG'}
   */
  randomString(length = 8, options = {}) {
    let numbers = '0123456789';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

    let chars = '';
    let result = '';

    if (options === true) {
      chars = numbers + letters + specials;
    } else if (typeof options == 'string') {
      chars = options;
    } else {
      if (options.numbers !== false) {
        chars += typeof options.numbers == 'string' ? options.numbers : numbers;
      }

      if (options.letters !== false) {
        chars += typeof options.letters == 'string' ? options.letters : letters;
      }

      if (options.specials) {
        chars +=
          typeof options.specials == 'string' ? options.specials : specials;
      }
    }

    while (length > 0) {
      length--;
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
};
