var express = require('express')
, router = express.Router()

var db=require("../db");
//change 
router.get("/getDailySum", function(req, res){
	var collection = db.getDb().collection('orders')
	res.setHeader("Content-Type", "application/json");
	collection.find().toArray(function(err, docs){
	//docs contains all records from menu in 
	//js array format
	var info=[];
	for(doc of docs) 
	info.push(doc);
	res.json(info);
	})
})

router.get("/summary", function(req, res){
	var collection = db.getDb().collection('orders');
	collection.find().toArray(function(err, docs){
	//docs contains all records from menu in 
	//js array format
	//var info=[];
	//for(doc of docs) 
	//info.push(doc);
	res.render('summary', {infoMenu: docs})
	})
})

module.exports = router
