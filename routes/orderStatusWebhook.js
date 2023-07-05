
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
var handleWebhookPayload = require("../public/javascripts/handleWebhookPayload.js");

router.post("/", upload.none(), async function (req, res) {
  var result = handleWebhookPayload.storeWebhooksPayload(req.body);
  res.sendStatus(200);
});

module.exports = router;

