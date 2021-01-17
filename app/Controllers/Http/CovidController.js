'use strict'
const {
  http_get,
  is_empty,
} = require('../../Tools/helper');

class CovidController {
  async travel({ request, response }) {
    const from_city_code = request.input('from_city_code', 440300);
    const to_city_code = request.input('to_city_code', 420200);
    const style_id = request.input('style_id', 30015);
    const { data } = await http_get('https://i.snssdk.com/api/amos/spring_travel/covid/info', {
      from_city_code: from_city_code,
      to_city_code: to_city_code,
      style_id: style_id,
    });
   
    return response.json({
      code: 200,
      message: 'ok',
      data: data,
    });
  }
}

module.exports = CovidController
