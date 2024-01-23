// See https://docs.mondu.ai/reference/webhook-security for more details

const crypto = require("crypto");

module.exports = class MonduVerifier {
  constructor(secret) {
    this.secret = secret;
  }

  verify(payload, signature) {
    // Extract the text of the UTF-8 payload as an array of bytes (including line endings)
    var encodedPayload = Buffer.from(JSON.stringify(payload), "utf8");

    var signaturePayload = crypto
      .createHmac("sha256", this.secret)
      .update(encodedPayload)
      .digest("hex");

    if (signaturePayload == signature) {
      return true;
    } else {
      return false;
    }
  }
};
