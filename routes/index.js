var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { user: req.user });
});

/* GET tests */
router.get('/tests', function(req, res){
	res.render('testing');
});

module.exports = router;
