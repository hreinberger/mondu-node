var express = require("express");
var router = express.Router();
var axios = require("axios");

let getOrders = async (page) => {
  const config = {
    method: "get",
    url: `https://api.demo.mondu.ai/api/v1/orders?page=${page}&per_page=10`,
    headers: { "Api-Token": process.env.MONDU_KEY },
  };

  let response = await axios(config);
  return response.data.orders;
};

router.get("/:page?", async (req, res, next) => {
  const page = req.params.page ? parseInt(req.params.page) : 1;

  // Validate that page is an integer
  if (!Number.isInteger(page)) {
    return res.status(400).send("Invalid page number");
  }

  orders = await getOrders(page);
  res.render("orders", {
    orders,
    page,
  });
});

module.exports = router;
