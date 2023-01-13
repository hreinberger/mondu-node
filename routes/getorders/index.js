var express = require('express');
var router = express.Router();
var axios = require('axios');

let getOrders = async() => {
const config = {
    method: 'get',
    url: 'https://api.demo.mondu.ai/api/v1/orders?page=1&per_page=1',
    headers: {'Api-Token': process.env.MONDU_KEY}
}

    let response = await axios(config);
    return response;
};


router.get('/', async(req, res, next) => {

    orders = await getOrders();
//    console.log(orders.data.orders)
    res.send(orders.data.orders)

});

module.exports = router;