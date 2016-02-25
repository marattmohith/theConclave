function registrationFormClear()
{
	document.getElementById("registrationForm").reset();
}

function signInFormClear()
{
	document.getElementById("signInForm").reset();
}

function validateForm1()
{	
		var status = true;
		var statusMessage="";
	
		var x1 = document.registrationForm.passw1.value;
		if(x1==null || x1=="")
		{
			statusMessage = statusMessage+("Password cannot be empty\n")
			status=false;
		}
		var x2 = document.registrationForm.passw2.value;
		if(x2==null || x2=="")
		{
			statusMessage = statusMessage+("Password cannot be empty\n")
			status=false;
		}
		if(x1!=x2)
		{
			statusMessage = statusMessage+("Password confirmation do not match!\n")
			status=false;
		}
		
		var zipcode = document.registrationForm.zipcode.value;
		if(zipcode.length<5)
			{
				statusMessage = statusMessage+("Enter valid Zipcode\n")
				statusMessage = statusMessage+("Zipcode cannot contain alphabets\n")
				status=false;
				var message = document.getElementById('zipcodePass');
				message.innerHTML = " Zipcode Should be of length greater than 4 numbers! "
			}
			else{
			
				var patt1 = /[a-zA-Z]/;
				var result = zipcode.match(patt1);
				if(result!=null)
				{
					statusMessage = statusMessage+("Zipcode cannot contain alphabets\n")
					status=false;
					var message = document.getElementById('zipcodePass');
					message.innerHTML = " Zipcode cannot contain alphabets! "
				}
		}
		 return status;
}

//check if the passwords are same during registration
	function checkPass()
	{
	    var pass1 = document.getElementById('passw1');
	    var pass2 = document.getElementById('passw2');
	    var message = document.getElementById('messagePass');
	    var goodColor = "#66cc66";
	    var badColor = "#ff6666";
	    if(pass1.value == pass2.value){
	        pass2.style.backgroundColor = goodColor;
	        message.style.color = goodColor;
	        message.innerHTML = " Passwords Match! "
	    }else{
	        pass2.style.backgroundColor = badColor;
	        message.style.color = badColor;
	        message.innerHTML = " Passwords Do Not Match! "
	    }
}  

//check if the zip code is valid
	function checkPassZip()
	{
	    var zipcodeValue = document.registrationForm.zipcode.value;
	    var message = document.getElementById('zipcodePass');
	    var goodColor = "#66cc66";
	    var badColor = "#ff6666";
	    if(zipcodeValue.length<5)
			{
				zipcode.style.backgroundColor = badColor;
		        message.style.color = badColor;
				message.innerHTML = " Zipcode Should be of length greater than 4 numbers! ";
			}
			else{
			
				var patt1 = /[a-zA-Z]/;
				var result = zipcodeValue.match(patt1);
				if(result!=null)
				{
					zipcode.style.backgroundColor = badColor;
		        	message.style.color = badColor;
					message.innerHTML = " Zipcode cannot contain alphabets!";
				}
				else
				{
					zipcode.style.backgroundColor = goodColor;
			        message.style.color = goodColor;
			        message.innerHTML = " Zipcode is valid! "
				}
		}
	} 