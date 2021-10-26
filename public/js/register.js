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
            alert("Something is broken, sorry: " + xhttp.status + ":" + xhttp.statusText); // e.g. 404: Not Found
        } else if (JSON.parse(xhttp.response).email!==undefined) { // show the result if response contains valid email
            let registeredEmail = JSON.parse(xhttp.response).email;
            alert("The user " + registeredEmail + " succesfully registered. Wait for email confirmation."); // response is the server response
            window.location = 'login.html';
        } else { //otherwise alert the response
            alert("Error: "+xhttp.response);
        }
    };

    xhttp.onerror = function () { //on other error, show alert
        alert("Shit happened: "+xhttp.response);
    };
}