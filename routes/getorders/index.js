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
    return response.data.orders;
};


router.get('/', async(req, res, next) => {

    orders = await getOrders();
    res.render('getorders', {
        orders
    })

});

module.exports = router;