'use strict';

const QRCode = use('qrcode');

class QrcodeController {
  async index({ request, view }) {
    const text = request.input('text');
    const result = await QRCode.toDataURL(text);
    return view.render('qrcode', { image: result });
  }
}

module.exports = QrcodeController;
