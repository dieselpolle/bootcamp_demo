//Set the REST API HOST by commenting the unnecessary
//
//1) Use localhost:
//var urlAPI = http://localhost:3000
//
//2) use other:
var urlAPI = https://mikko-bootcamp-backend.herokuapp.com

//set available controller URL's
var urlRegister = urlAPI+"/requestAuth";
var urlLogin = urlAPI+"/requestAuth/user/auth";
var urlMain = urlAPI+"/user";

//implements the login and registers functionalities
function send(action, ipAdd, allIPData) {

    //check the action login or register and set the correct target html
    if (action == "login") goTo = "login.html";
    else if (action == "register") goTo = "index.html";

    //get the email to be registered or authenticated
    email = document.getElementById("email").value;

    //if processing login request, set all info to client's session memory
    if (action == "login") {
        pass = document.getElementById("password").value;
        apiUsername = document.getElementById("apiUsername").value;
        apiPassword = document.getElementById("apiPassword").value;
        window.sessionStorage.setItem("apiUsername", apiUsername);
        window.sessionStorage.setItem("apiPassword", apiPassword);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("password", pass);
    }
    
    //set correct url of controller
    if (action == "register") url = urlRegister;
    else if (action == "login") url = urlLogin;

    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    //set correct parameters to the request according to the form action
    if (action == "register") var requestParams = { "email": email, "ip": ipAdd };
    else if (action == "login") {
        var requestParams = { "username": email, "password": pass };
        xhttp.setRequestHeader('Authorization', "Basic " + window.btoa(apiUsername + ":" + apiPassword));
    }
    //send the request
    xhttp.send(JSON.stringify(requestParams));

    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            window.location = goTo + "?errorMessage='I am sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
        }
    };

    //check the state of the request processing, on state 4 the request is completely processed
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            //if email parameter is undefined, it is already in db
            if (action == "register" && JSON.parse(xhttp.responseText).email == undefined) { 
                //show message on the html page
                window.location = "index.html?errorMessage='The email is already registered.'"; 
            //show the result if the response contains valid email meaning the registering was succesful
            } else if (action == "register" && JSON.parse(xhttp.responseText).email != undefined) { 
                window.location = "login.html?message='The user " + JSON.parse(xhttp.responseText).email + " succesfully registered. Wait for email confirmation.'"; //show message on page
            //when processing user login, open the main page if login was succesful
            } else if (action = "login" && xhttp.status == 200) {
                if (xhttp.responseText == "true") window.location = "main.html";
                //when login fails, show error message
                else window.location = "login.html?errorMessage='Login failed. Try again.'";
            } else {
                //in any other case, just show message on page
                window.location = goTo + "?message='Server responded:" + xhttp.status + ":" + xhttp.statusText + "'";
            }
        }
    };
    //on any other error, show error on page
    xhttp.onerror = function () { 
        window.location = goTo + "?errorMessage='I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
    };
}
//shows the user listing
function getUser() {
    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    url = urlMain;
    xhttp.open("GET", url);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader('Authorization', "Basic " + window.btoa(window.sessionStorage.getItem("apiUsername") + ":" + window.sessionStorage.getItem("apiPassword")));
    xhttp.send();
    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) {
            return "I am sorry: " + xhttp.status + ":" + xhttp.statusText;
        }
    };
    //check the state of the request processing, on state 4 the request is completely processed
    //returns the response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            userData = JSON.stringify(xhttp.response);
            return JSON.stringify(xhttp.response);
        }
    };
    //on error, return error
    xhttp.onerror = function () {
        return "'I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
    };
}
//checks if the users session is valid
function checkLogin() {
    if (window.sessionStorage.getItem("email") == "" || window.sessionStorage.getItem("email") == null) return false;
    else return true;
}
//gets the IP information of the client
function getIP(action) {
    let url = 'http://ip-api.com/json';
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send();
    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            return "";
        }
    };
    //check the state of the request processing, on state 4 the request is completely processed
    //returns the response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            ipAddress = JSON.parse(xhttp.responseText).query;
            allIPData = JSON.stringify(xhttp.response);
            send(action, ipAddress, allIPData);
        }
    };
    //on error, return error
    xhttp.onerror = function () { //on other error, show alert
        return null;
    };
}