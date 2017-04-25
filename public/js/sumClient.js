//this pizza array will get the information from node.js
let pizzas=[];
//{name: "Pepperoni", img: "./images/pizza1.jpg", price:8.99 },
//{name: "Cheese", img: "./images/cheesePizza.jpg", price:7.99 },
//{name: "Hawaiian", img: "./images/pizza2.png", price:10.99 },
//{name: "Works", img: "./images/worksPizza.jpg", price:10.99 },
//{name: "Alfredo", img: "./images/pizza2.jpg", price:11.99 },
//{name: "Veggie", img: "./images/veggiePizza.jpg", price:9.99 },
//
//];
$(document).ready(function(){
	var jqxhr = $.ajax( "/getDailySum" ).done(function(docs) {
		for(doc of docs)
			pizzas.push(doc);
		showCart();
	})
});
//copy from ajax handout
//remove .fail
//change generatecart to showcart



function getCartNum(){
	let number= localStorage.getItem("number");
	if (number===null)
		number=0;
	document.getElementById("numItem").innerHTML=number;
}


function clearCart()
{
	localStorage.removeItem("cart");
	localStorage.removeItem("number");

	let number= localStorage.getItem("number");
	if (number===null)
		number=0;
	document.getElementById("numItem").innerHTML=number;
}

function showCart()
{
	let cartJ=localStorage.getItem("cart");
	let cart=[];
	let cartTP=[];
	let info="";
	//PRICE
	let totalP=0;
	if (cartJ===null)
	{
		document.getElementById("totalPriceSum").innerHTML=`<p>$ 0.00 </p>`;
	}
	else
	{
		cartTP=cartJ.split(",");

		for (let i of cartTP) //for loop to add up total price
		{
			let item=pizzas[i];
			totalP=totalP+item.price;
		}
		totalP = totalP.toFixed(2);
		document.getElementById("totalPriceSum").innerHTML=`<p>$ ${totalP} </p>`;
	}
	//PRICE
	if (cartJ===null)
		document.getElementById("mySum").innerHTML="<h2>Nothing Ordered Today!</h2>";
	else
	{
		cart=cartJ.split(",");
		
		for (let i in cart)
		{
			let item=pizzas[cart[i]];
			info+=
				`
				<div class="row">
					<div class="col-md-2 text-center">
						<h3>${item.name}</h3>
					</div>
					<div class="col-md-2">
						<img class="pizzaimg" src="${item.img}" alt="pizza1">
					</div>
					<div class="col-md-2 text-center">
					<h3>${item.price}</h3>
					</div>
				</div>`;
		}//end of loop
	
		document.getElementById("mySum").innerHTML=info;
	}
}

