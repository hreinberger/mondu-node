
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
var handleWebhookPayload = require("../helpers/webhooks/handleWebhookPayload.js");

//Thie endoing awaits Order Webhook payload
router.post("/", upload.none(), async function (req, res) {
  var result = handleWebhookPayload.storeWebhooksPayload(req.body);
  res.sendStatus(200);
});

module.exports = router;

