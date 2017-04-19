var express = require('express')
, router = express.Router()

var db=require("../db");
//change 
router.get("/getMenuItems", function(req, res){
	var collection = db.getDb().collection('menu')
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

router.get("/menu", function(req, res){
	var collection = db.getDb().collection('menu');
	collection.find().toArray(function(err, docs){
	//docs contains all records from menu in 
	//js array format
	//var info=[];
	//for(doc of docs) 
	//info.push(doc);
	res.render('menu', {infoMenu: docs})
	})
})

module.exports = router
