var express = require('express');
var router = express.Router();
router.get('/customers', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM customers", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.customers = results;
		res.render('customers', context);
	});
});

router.post('/customers', function(req, res){
	var mysql = req.app.get('mysql');

	var sql = "INSERT INTO customers (customerFirst, customerLast, phone, email, street, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	var inserts = [req.body.customerFirst, req.body.customerLast, req.body.phone, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zip];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/customers');
		}
	});
});

function getID(body) {
	var id;
	switch(body) {
		case "sedan":
			id = 1;
			break;
		case "van":
			id = 2;
			break;
		case "truck":
			id = 3;
			break;
		case "suv":
			id = 4;
			break;
		default:
			id = null;
	}
	return id;
}

module.exports = router;