var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('Success!'+ req.body);
});

module.exports = router;
