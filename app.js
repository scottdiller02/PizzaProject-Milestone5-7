var express=require("express");
var http=require("http");
var path=require("path");
var handlebars=require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require('body-parser');
var db = require('./db');
//
var dbLink=require("./json/config.json");
var url = dbLink.devServer.url;
var app=express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//app.use(bodyParser.urlencoded({extended: true}));app.use(bodyParser.json());
var publicPath=path.resolve(__dirname, "public"	);
app.use(express.static(publicPath));
app.use(require('./routers/popMenus'));
//app.user routers
app.use(require("./routers/getMenuItems"));
app.use(require('./routers/signup'));
app.use(require('./routers/processOrders'));
// Connect to Mongo on start
db.connect(url, function(err){
    if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
} else {
	app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
 }
})

app.get("/",function(req,res){
		console.log("Coming a request!");
	res.sendFile(`${publicPath}/main.html`);
});

app.get("/main",function(req,res){
		console.log("Coming amainrequest!");
	res.sendFile(`${publicPath}/main.html`);
});

//app.get("/menu",function(req,res){
//		console.log("Coming a menurequest!");
//	res.sendFile(`${publicPath}/menu.html`);
//});

app.get("/menu",function(req,res){
		console.log("Coming a signuprequest!");
	res.render(`menu`);
});

app.get("/cart",function(req,res){
		console.log("Coming a request!");
	res.sendFile(`${publicPath}/cart.html`);
});

/*
app.get("/cart",function(req,res){
		console.log("Coming a signuprequest!");
	res.render(`cart`);
});
*/
app.get("/about",function(req,res){
		console.log("Coming a request!");
	res.sendFile(`${publicPath}/about.html`);
});

app.get("/signup",function(req,res){
		console.log("Coming a signuprequest!");
	res.render(`signup`);
});

//app.get("/getMenuItems", function(req, res){
//

//});

//app.listen(3000, function () {
//	console.log('Example app listening on port 3000!')
//});

/*app.post("/signupServer", function (req,res){
		console.log("Coming a signup request!");
	res.send("THe server is handling your request"+req.body.email);
});
*/

//var listener=http.createServer(app).listen(process.env.PORT||3000);
//console.log('Server is listening at port'+listener.address().port);

app.set('db',db);
module.exports.app=app;
