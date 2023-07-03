var express = require("express");
var router = express.Router();
const axios = require("axios");
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), async function (req, res) {
  // log incoming data
  console.log("Delete Webhooks");


  // Check if we need to authorize the order
  const shouldAuthorize = req.body.authorize === "true";

  // Fill Delete Webhook Request
  const options = {
    method: "DELETE",
    url: 'https://api.demo.mondu.ai/api/v1/webhooks/' + req.body.uuid,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "Api-Token": process.env.MONDU_KEY, // read Mondu API key from .env
    }
  };

  // Send Delete Webhook Request

  const MonduSession = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error.response.data);
      return error.response.data;
    });

  // print API request output
  res.send(MonduSession);
});

module.exports = router;
