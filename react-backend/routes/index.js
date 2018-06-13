var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



//import db from '../db';

router.post('/', function(req, res, next) {
	db.all('select * from users', (err, results) => {
		console.log(results);
		res.render('index', {sql: req.body.sql})
	});
});

module.exports = router;