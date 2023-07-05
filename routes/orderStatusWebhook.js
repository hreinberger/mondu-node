
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
var handleWebhookPayload = require("../public/javascripts/handleWebhookPayload.js");

router.post("/", upload.none(), async function (req, res) {
  //log incoming order data
  console.log(req.body);
  console.log(req.get('host'));
  console.log(req.originalUrl);
  var result = handleWebhookPayload.storeWebhooksPayload(req.body);
  console.log('result:', result);
  console.log('get payload:', handleWebhookPayload.getWebhooksPayload());
  res.sendStatus(200);
});

module.exports = router;

