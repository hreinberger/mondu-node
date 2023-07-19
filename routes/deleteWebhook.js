var express = require("express");
var router = express.Router();
const axios = require("axios");
const multer = require("multer");
const upload = multer();
//const deleteWebhook = require("../helpers/mondu_api/deleteWebhook");

//This function calls mondu API delete webhook endpoint.
let deleteWebhook = async (uuid) => {
  const config = {
    method: "delete",
    url: `https://api.demo.mondu.ai/api/v1/webhooks/` + uuid,
    headers: { "Api-Token": process.env.MONDU_KEY },
  };
  let response = await axios(config).catch(function (error) {
    console.log("Delete webhook failed:", error.response.data);
    return error.response.data;
  });
  return response.data;
};


//Local endpoint used to trigger deletion of webhook with specific uuid
router.post("/", upload.none(), async function (req, res) {

  //Delete Webhook calling Mondu API.
  const deleteWebhookResult = await deleteWebhook(req.body.uuid);
  //Show registration result in console.
  console.log("Delete Webhook:", deleteWebhookResult);
  res.send(deleteWebhookResult);

});

module.exports = router;
