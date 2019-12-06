'use strict';

const QRCode = use('qrcode');

class QrcodeController {
  async index({ request, response }) {
    const text = request.input('text');
    const type = request.input('type');
    const result = await QRCode.toDataURL(text);
    return result;
  }
}

module.exports = QrcodeController;
