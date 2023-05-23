var express = require("express");
var router = express.Router();
const axios = require("axios");
const multer = require("multer");
const upload = multer();

router.post("/", upload.none(), async function (req, res) {
  // log incoming data
  console.log(req.body);

  // check if we need to authorize the order
  const shouldAuthorize = req.body.authorize === "true";

  // Fill Create Order API Request
  const options = {
    method: "POST",
    url: "https://api.demo.mondu.ai/api/v1/orders",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "Api-Token": process.env.MONDU_KEY, // read Mondu API key from .env
    },
    data: {
      // Fill request with form data
      currency: "EUR",
      billing_address: {
        country_code: req.body.country,
        city: req.body.city,
        zip_code: req.body.zip,
        address_line1: req.body.address,
      },
      shipping_address: {
        country_code: req.body.country,
        city: req.body.city,
        zip_code: req.body.zip,
        address_line1: req.body.address,
      },
      buyer: {
        is_registered: false,
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        company_name: req.body.companyName,
      },
      lines: [
        {
          line_items: [
            {
              quantity: 5,
              external_reference_id: "1",
              title: "Product 1",
              net_price_per_item_cents: 20000,
              tax_cents: 3800,
            },
            {
              quantity: 1,
              external_reference_id: "2",
              title: "Product 2",
              net_price_per_item_cents: 1000,
              tax_cents: 190,
            },
            {
              quantity: 1,
              external_reference_id: "3",
              title: "Product 3",
              net_price_per_item_cents: 1000,
              tax_cents: 190,
            },
          ],
        },
      ],
      payment_method: req.body.paymentMethod,
      language: "en",
      success_url: publicUrl + "/success",
      declined_url: "https://bing.com",
      cancel_url: publicUrl,
      total_discount_cents: 0,
      external_reference_id: "test" + Date.now(), // fill external reference with a unique value. Can be changed later
      notes: "your notes here",
      source: "widget",
      gross_amount_cents: 102000,
      ...(shouldAuthorize ? { state_flow: "authorization_flow" } : {}), // trigger Mondu authorization flow when requested
    },
  };

  // send Create Order Request
  // The request returns the session token we need to link the widget to the order

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
