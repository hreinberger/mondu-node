
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), async function (req, res) {
  //log incoming order data
  console.log(req.body);
  console.log(req.get('host'));
  console.log(req.originalUrl);
  res.sendStatus(200);
});

module.exports = router;

