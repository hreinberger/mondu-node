var express = require("express");
var router = express.Router();
var axios = require("axios");
var handleWebhookPayload = require("../helpers/webhooks/handleWebhookPayload.js");

//This function calls mondu API delete webhook endpoint.
let getWebhooks = async (page) => {
  const config = {
    method: "get",
    //url: `https://api.demo.mondu.ai/api/v1/webhooks`,
    url: `https://api.demo.mondu.ai/api/v1/webhooks?page=${page}&per_page=10`,
    headers: { "Api-Token": process.env.MONDU_KEY },
  };
  let response = await axios(config).catch(function (error) {
    console.log("Get webhooks failed:", error.response.data);
    return error.response.data;
  });

  return response.data.webhooks;
};

//Application endpoint that invoces the page lisitng webhooks
router.get("/:page?", async (req, res, next) => {
  const page = req.params.page ? parseInt(req.params.page) : 1;

  // Validate that page is an integer
  if (!Number.isInteger(page)) {
    return res.status(400).send("Invalid page number");
  }

  webhooks = await getWebhooks(page);
  console.log('Get all registered webhooks:', webhooks);
  orderStatus = handleWebhookPayload.getWebhooksPayload()['order'];
  invoicStatus = handleWebhookPayload.getWebhooksPayload()['invoice'];

  res.render("webhooks", {
    webhooks,
    page,
    orderStatus,
    invoicStatus,
  });
});

module.exports = router;