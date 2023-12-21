var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");
const upload = multer();
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

router.post("/", upload.none(), async function (req, res) {
  // validate the UUID parameter
  if (!uuidValidate(req.body.uuid)) {
    res.status(400).send("Invalid UUID");
    return;
  }

  // Gather data from request
  const uuid = req.body.uuid;
  const externalRefId =
    req.body.externalRefId || "mondu-node-" + Date.now().toString();
  const amount = req.body.amount;
  const url = "https://api.demo.mondu.ai/api/v1/orders/" + uuid + "/invoices";

  // Fill Create Invoice API Request with JSON payload and invoice PDF
  // We use the FormData object to send the invoice PDF
  const formData = new FormData();

  formData.append("file", fs.createReadStream("public/files/invoice.pdf"), {
    contentType: "application/pdf",
  });

  formData.append("external_reference_id", externalRefId);
  formData.append("invoice_url", "https://not.provided"); // dummy URL because we need one
  formData.append("gross_amount_cents", amount);

  const options = {
    method: "POST",
    url,
    headers: {
      accept: "application/json",
      "Api-Token": process.env.MONDU_KEY,
      ContentType: "multipart/form-data", // important!
    },
    data: formData,
  };

  const monduInvoice = await axios
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
  res.send(monduInvoice);
});

module.exports = router;
