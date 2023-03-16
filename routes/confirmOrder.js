var express = require('express');
var router = express.Router();
const axios = require('axios');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

router.post('/', async function(req, res) {

  // validate the UUID parameter
  if (!uuidValidate(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  }

  const uuid = req.body.uuid
  const url = 'https://api.demo.mondu.ai/api/v1/orders/' + uuid + '/confirm'

  // Fill Confirm Order API Request
  const options = {
    method: 'POST',
    url: url,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'Api-Token': process.env.MONDU_KEY // read Mondu API key from .env
    },
    data: {
      comment: "order confirmation comment"
    }
  };

 
  const MonduResponse = await 
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.error(error.response.data)
      return error.response.data
    });



  // print API request output
  res.send(MonduResponse);
});

module.exports = router;