class Validation{
	constructor(id, re, errorMsg)
	{
		this.id=id;
		this.re=re;
		this.errorMsg=errorMsg;
		this.nodeMsg=null;
	}
	validate()
	{
		let input= this.id.value;
		let validResult=this.re.test(input);
		if (!validResult)
		{
			if (this.nodeMsg===null)
			{
				this.id.style.backgroundColor="red";
				//use DOM to add a node to the HTML. This node is a <p> element .containing the errorMSg.
				this.nodeMsg=document.createElement("p");
				// p is html tag (<p>)
				this.nodeMsg.textContent=this.errorMsg;
				let parent=document.getElementById("signup");
				parent.insertBefore(this.nodeMsg, this.id);
			}
		}
		else
		{
			if (this.nodeMsg!==null) //error on screen need to remove
			{
				let parent=document.getElementById("signup");
				parent.removeChild(this.nodeMsg);
				this.id.style.backgroundColor="white";
			}
		}

		return validResult;
	}


}

function validateEmail()
{
	let id=document.getElementById("email");
	// \S means anything that is not whitespace
	// + the Letter must appear at least 1 time
	let re=/\S+@\S+.\S+/;
	let v= new Validation(id, re, "Invalid Email" );
	id.addEventListener("blur", function(){
		return v.validate();

		//closure: inside function can use any variables defined in its parent function
	});
}

function validatePwd()
{
	let id=document.getElementById("pwd");
	// \S means anything that is not whitespace
	// + the Letter must appear at least 1 time
	let re=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	let v= new Validation(id, re, "Invalid Password" );
	id.addEventListener("blur", function(){
		return v.validate();

		//closure: inside function can use any variables defined in its parent function
	});
}