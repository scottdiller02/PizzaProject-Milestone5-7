var bodyParser = require('body-parser');
var express = require('express')
, router = express.Router()
var db=require("../db");
//support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));
router.post("/signupServer", function(req, res){
	var email=req.body.email;
	var pwd=req.body.pwd;
	console.log(email);
	console.log(pwd);

	var collection = db.getDb().collection('users')
	//res.setHeader('Content-Type', 'application/json')
	var query={"email":email};
	collection.find(query).toArray(function(err, docs){
	//docs contains all records from menu in 
	//js array format
	//var info=[];
	//for(doc of docs) 
	//info.push(doc);
	if (docs.length===0)
	{
		collection.insert({"email":email, "password":pwd}, function(err, result)
		{
			if(err==null)
				res.redirect("/");
			else
				res.render("signup", {errmessage:"ERROR: try again"})
		});
	
		//res.redirect("/");
	}
	else
	{
		res.render("signup", {errmessage:"Failed: Email has already been used", errcolor:"alert alert-danger"})
	}
	})
})
module.exports = router
