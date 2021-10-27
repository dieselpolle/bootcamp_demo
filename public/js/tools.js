function sendRequestForAuth() {
    //get the email to be registered
    email = document.getElementById("email").value;

    //any chance to put this on client variables?
    var url = "https://mikko-bootcamp-backend.herokuapp.com/requestAuth";

    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    var requestParams = { "email": email };
    xhttp.send(JSON.stringify(requestParams));

    //wait the execution to be ready or alert an error
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            window.location="index.html?errorMessage='Something is broken, sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
        } else if (JSON.parse(xhttp.response).email!==undefined) { // show the result if response contains valid email
            let registeredEmail = JSON.parse(xhttp.response).email;
            window.location = "login.html?message='The user " + registeredEmail + " succesfully registered. Wait for email confirmation.'"; //show message on page
        } else { //if email parameter is undefined, it is already in db
            window.location="index.html?errorMessage='The email is already registered."; //show error on page
        }
    };

    xhttp.onerror = function () { //on other error, show alert
        window.location="index.html?errorMessage='Something is broken, sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
    };
}