var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  console.log(req.body);
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  res.send('Success! Your Name is ' + firstName + ' ' + lastName + ' ' + ' and the Mondu Key is ' + process.env.MONDU_KEY )
});

module.exports = router;
