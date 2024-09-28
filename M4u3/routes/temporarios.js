var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('temporarios'); // este me busca en views/temporarios.hbx
});

module.exports = router;