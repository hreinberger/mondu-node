// See https://docs.mondu.ai/reference/webhook-security for more details

const crypto = require("crypto");

module.exports = class MonduVerifier {
  constructor(secret) {
    this.secret = secret;
  }

  verify(payload, signature) {
    var signaturePayload = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signaturePayload == signature) {
      return true;
    } else {
      return false;
    }
  }
};
