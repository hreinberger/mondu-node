const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

var handleWebhookPayload = require("../helpers/webhooks/handleWebhookPayload.js");
var MonduVerifier = require("../helpers/webhooks/checkWebhookSignature.js");

//This endpoint awaits Order Webhook payload
router.post("/", upload.none(), async function (req, res) {
  // Verify webhook authenticity https://docs.mondu.ai/reference/webhook-security

  var verifier = new MonduVerifier(global.webhookSecret);
  var payload = req.body;
  var signature = req.headers["x-mondu-signature"];
  var isVerified = verifier.verify(payload, signature);

  if (isVerified) {
    handleWebhookPayload.storeWebhooksPayload(req.body);
    res.sendStatus(200);
  } else {
    console.error("Webhook verification failed");
    res.sendStatus(403);
  }
});

module.exports = router;
