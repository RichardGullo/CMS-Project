var urlBase = 'http://COP4331-29.com/LAMPAPI';
var extension = 'php';

var userEmail = "";
var userName = "";
var firstName = "";
var lastName = "";


/*-------------- Login Functions------------------------------ */

// When user clicks log in button, we execute this.
async function doLogin() {
	userEmail = "";
	firstName = "";
	lastName = "";
	let error = document.getElementById("loginResult");
	error.innerHTML="";

	let formData = new FormData();

	// Gets values from form fields(username, password, etc)
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	// 	var hash = md5( password );
	formData.append('username', login);
	formData.append('password', password);

	// Reset feedback/error field to empty string
	// We will write to this field if the user needs to know something.
	document.getElementById("loginResult").innerHTML = "";

	let response = await fetch("http://192.168.86.34/jadar-api/login.php", {
		method: "POST",
		body: formData
	});

	let result = await response.json();

	if(result['error'] != ''){
		error.innerHTML= result['error'];
		return;
	}

	userEmail = result['data'][0].email;
	firstName = result['data'][0].first_name;
	lastName = result['data'][0].last_name;
	saveCookie();
	window.location.href = "homepage.html";

}


// When user clicks log out, we execute this.
function doLogout() {
	email = "";
	firstName = "";
	lastName = "";
	document.cookie = "name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "userEmail=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// When user clicks register, we do this.
function doRegister() {
	// Grabs form fields
	userEmail = document.getElementById("userEmail").value;
	userName = document.getElementById("userName").value;
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	var password = document.getElementById("password").value;
	// var hash = md5( password );

	document.getElementById("registerResult").innerHTML = "";


	let formData = new FormData();
	formData.append('firstName', firstName);
	formData.append('lastName', lastName);
	formData.append('pass', password);
	formData.append('email', userEmail);

	fetch("http://192.168.86.34/JADAR/LAMPAPI2/register.php", {
		method: "POST",
		body: formData
	}).then(function (res) {
		return res.json();


	}).then(function (data) {

		// document.getElementById("registerResult").innerHTML = "Error with register.";

		userName = data.first_name;
		userEmail = data.email;
		firstName = data.first_name;
		lastName = data.last_name;

		saveCookie();
		window.location.href = "homepage.html";

	});
}

function doContactSearch() {
	// Grabs form fields
	firstName = document.getElementById("search-bar").value;
	lastName = "";//document.getElementById("lastName").value;

	document.getElementById("contactSearchResult").innerHTML = "";

	// Combine form field variables into JSON string
	var jsonPayload = '{"userName":"' + userName + '", "firstName" : "' + firstName + '"}';
	var url = urlBase + '/ContactSearch2.' + extension;

	// Connection
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);

				contactList = "";
				for (var i = 0; i < jsonObject.contacts.length; i++) {
					//contactList += JSON.stringify(jsonObject.contacts[i]);
					contactList += jsonObject.contacts[i].contactEmail + ", ";
					contactList += jsonObject.contacts[i].firstName + ", ";
					contactList += jsonObject.contacts[i].lastName + ", ";
					contactList += jsonObject.contacts[i].address + ", ";
					contactList += jsonObject.contacts[i].phone;
					if (i < jsonObject.contacts.length - 1) {
						contactList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

/*-----------------Top of Page Button---------------------------*/

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	var mybutton = document.getElementById("topBtn");

	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topOfPage() {
	var mybutton = document.getElementById("topBtn");

	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*-------------------------------------------------------------*/


/*----------------Cookie Functions------------------------------*/

function saveCookie() {
	var minutes = 20;
	var date = new Date();
	date = date.setTime(date.getTime() + (minutes * 60 * 1000));
	// document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userName=" + userName + ",userEmail=" + userEmail + ";expires=" + date.toGMTString();

	
	document.cookie = `name=${firstName} ${lastName}`;
	document.cookie = `userEmail=${userEmail}`;
	
}


function readCookie() {
	userEmail = "";
	var data = document.cookie;
	var splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userName") {
			userName = tokens[1];
		}
		else if (tokens[0] == "userEmail") {
			userEmail = tokens[1];
		}
	}

	if (userName === "") {
		window.location.href = "index.html";
	}
}
/*------------------------------------------------------------*/
