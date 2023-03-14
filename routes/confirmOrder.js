var express = require('express');
var router = express.Router();
const axios = require('axios');
const multer  = require('multer')
const upload = multer()

router.get('/:uuid', upload.none(), async function(req, res) {

  console.log(req.body);
  uuid = req.params.uuid
  url = 'https://api.demo.mondu.ai/api/v1/orders/' + uuid + '/confirm'

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