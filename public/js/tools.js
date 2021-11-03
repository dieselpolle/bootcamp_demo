//Set url to API interface
var urlAPI = "https://mikko-bootcamp-backend.herokuapp.com";

//set available controller URL's
var urlRegister = urlAPI + "/requestAuth";
var urlLogin = urlAPI + "/user/auth";
var urlMain = urlAPI + "/user";
var urlIpAdd = urlAPI + "/ipAddr"

//implements the login and registers functionalities
function register(ipAdd) {

    //get the email to be registered
    email = document.getElementById("email").value;

    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", urlRegister, true);
    xhttp.setRequestHeader("content-type", "application/json");
    //set correct parameters to the request according to the form action
    var requestParams = { "email": email, "ip": ipAdd };
    //send the request
    xhttp.send(JSON.stringify(requestParams));

    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            window.location = "index.html?errorMessage='I am sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
        }
    };

    //check the state of the request processing, on state 4 the request is completely processed
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            //if email parameter is undefined, it is already in db
            if (JSON.parse(xhttp.responseText).email == undefined) {
                //show message on the html page
                window.location = "index.html?errorMessage='The email is already registered.'";
                //show the result if the response contains valid email meaning the registering was succesful
            } else if (JSON.parse(xhttp.responseText).email != undefined) {
                window.location = "login.html?message='The user " + JSON.parse(xhttp.responseText).email + " succesfully registered. Wait for email confirmation.'";
            } else {
                //in any other case, just show message on page
                window.location = "index.html?message='Server responded:" + xhttp.status + ":" + xhttp.statusText + "'";
            }
        }
    };
    //on any other error, show error on page
    xhttp.onerror = function () {
        window.location = "login.html?errorMessage='I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
    };
}
//implements the login and registers functionalities
function login() {

    email = document.getElementById("email").value;
    pass = document.getElementById("password").value;
    apiUsername = document.getElementById("apiUsername").value;
    apiPassword = document.getElementById("apiPassword").value;
    window.sessionStorage.setItem("apiUsername", apiUsername);
    window.sessionStorage.setItem("apiPassword", apiPassword);
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("password", pass);

    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", urlLogin, true);
    xhttp.setRequestHeader("content-type", "application/json");
    //set correct parameters to the request according to the form action
    var requestParams = { "username": email, "password": pass };
    xhttp.setRequestHeader('Authorization', "Basic " + window.btoa(apiUsername + ":" + apiPassword));
    //send the request
    xhttp.send(JSON.stringify(requestParams));

    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            window.location = "login.html?errorMessage='I am sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
        }
    };

    //check the state of the request processing, on state 4 the request is completely processed
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.responseText == "true") {
                window.location = "main.html";
            }
            //when login fails, show error message
            else {
                window.sessionStorage.setItem("password", "");
                window.location = "login.html?errorMessage='Login failed. Try again.'";
            }
        }
        else {
            //in any other case, just show message on page
            window.location = "login.html?message='Server responded:" + xhttp.status + ":" + xhttp.statusText + "'";
        }
    };
    //on any other error, show error on page
    xhttp.onerror = function () {
        window.location = "login.html?errorMessage='I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
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
    if (window.sessionStorage.getItem("password") == "" || window.sessionStorage.getItem("password") == null) return false;
    else return true;
}
//gets the IP information of the client
function getIP() {
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
            allIPData = xhttp.responseText;
            storeIPData(allIPData, ipAddress);
        }
    };
    //on error, return error
    xhttp.onerror = function () { //on other error, return nothing
        return null;
    };
}
//store client's ip data to db
function storeIPData(data, ipAddress) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", urlIpAdd);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(data);
    //check if the api is available
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            console.log("storeIpData, httpstatus not 200: " + xhttp.responseText);
        }
    };
    //check the state of the request processing, on state 4 the request is completely processed
    //returns the response
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            console.log("storeIpData, state change: " + xhttp.responseText);
            register(ipAddress);
        }
    };
    //on error, return error
    xhttp.onerror = function () { //on other error, show alert
        console.log("storeIpData, error: " + xhttp.responseText);
    };
}