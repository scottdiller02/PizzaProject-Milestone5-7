 var express = require('express')
, router = express.Router()
var db = require('../db')

router.get('/menu', function(req, res) {
var info=[];
var i=0;
var collection = db.getDb().collection('menu');
//res.setHeader('Content-Type', 'application/json');
collection.find().toArray(function(err, docs) {
	for(doc of docs)
		info.push(doc);
	console.log(info);
	res.render('menu',{infoMenu:info});
});
});

module.exports = router;