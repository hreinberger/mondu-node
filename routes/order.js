var express = require("express");
var router = express.Router();
var axios = require("axios");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
var handleWebhookPayload = require("../helpers/webhooks/handleWebhookPayload.js");

let getOrder = async () => {
  const config = {
    method: "get",
    url: "https://api.demo.mondu.ai/api/v1/orders/" + uuid,
    headers: { "Api-Token": process.env.MONDU_KEY },
  };

  let response = await axios(config);
  return response.data.order;
};

router.get("/:uuid", async (req, res, next) => {
  // validate the UUID parameter
  if (!uuidValidate(req.params.uuid)) {
    res.status(400).send("Invalid UUID");
    return;
  }

  uuid = req.params.uuid;
  orderStatus = handleWebhookPayload.getOrderWebhooksPayload(uuid);

  order = await getOrder();
  console.log('Orders Payload:',orderStatus);
  
  res.render("order", {
    order,   
    orderStatus
  });
});

module.exports = router;
