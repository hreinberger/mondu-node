var express = require("express");
var router = express.Router();
const axios = require("axios");
const multer = require("multer");
const upload = multer();


//It calls Mondu API Create Webhook endopint.
let registerWebhook = async (topic, address) => {
  const config = {
    method: "post",
    url: `https://api.demo.mondu.ai/api/v1/webhooks`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "Api-Token": process.env.MONDU_KEY
    },
    data: {
      topic: topic,
      address: address
    }
  };

  let response = await axios(config).catch(function (error) {
    console.log("Webhook registration failed:", topic, address, error.response.data);
    return error.response.data;
  });
  return response.data;
};

//Application endpoint that triggers creation of webhook topic.
router.post("/", upload.none(), async function (req, res) {
  //Generate webhook URL.
  var webhookAddress = global.publicUrl + "/" + req.body.type + "Status"
  //Register Webhook calling Mondu API.
  const registerWebhookResult = await registerWebhook(req.body.type, webhookAddress);
  //Show registration result in console. 
  console.log("Register webhook:", registerWebhookResult);
  res.send(registerWebhookResult);
});

module.exports = router;
