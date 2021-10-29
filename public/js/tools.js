//var urlRegister = "https://mikko-bootcamp-backend.herokuapp.com/requestAuth";
//var urlLogin = "https://mikko-bootcamp-backend.herokuapp.com/user/auth";
//var urlMain = "https://mikko-bootcamp-backend.herokuapp.com/user";

var urlRegister = "http://localhost:3000/requestAuth";
var urlLogin = "http://localhost:3000/requestAuth/user/auth";
var urlMain = "http://localhost:3000/user";

function send(action, ipAdd, allIPData) {

    if (action == "login") goTo = "login.html";
    else if (action == "register") goTo = "index.html";

    //get the email to be registered
    email = document.getElementById("email").value;
    if (action == "login") {
        pass = document.getElementById("password").value;
        apiUsername = document.getElementById("apiUsername").value;
        apiPassword = document.getElementById("apiPassword").value;
        window.sessionStorage.setItem("apiUsername", apiUsername);
        window.sessionStorage.setItem("apiPassword", apiPassword);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("password", pass);
    }
    
    if (action == "register") url = urlRegister;
    else if (action == "login") url = urlLogin;

    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    if (action == "register") var requestParams = { "email": email, "ip": ipAdd };
    else if (action == "login") {
        var requestParams = { "username": email, "password": pass };
        xhttp.setRequestHeader('Authorization', "Basic " + window.btoa(apiUsername + ":" + apiPassword));
    }
    xhttp.send(JSON.stringify(requestParams));

    //wait the execution to be ready or alert an error
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            window.location = goTo + "?errorMessage='I am sorry: " + xhttp.status + ":" + xhttp.statusText + "'"; //show error on page
        }
    };

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (action == "register" && JSON.parse(xhttp.responseText).email == undefined) { //if email parameter is undefined, it is already in db
                window.location = "index.html?errorMessage='The email is already registered.'"; //show error on page
            } else if (action == "register" && JSON.parse(xhttp.responseText).email != undefined) { // show the result if response contains valid email
                window.location = "login.html?message='The user " + JSON.parse(xhttp.responseText).email + " succesfully registered. Wait for email confirmation.'"; //show message on page
            } else if (action = "login" && xhttp.status == 200) {
                if (xhttp.responseText == "true") window.location = "main.html"; //open the main page after succesful login
                else alert(xhttp.responseText);
            } else {
                //in any other case, just show message on page
                window.location = goTo + "?message='Server responded:" + xhttp.status + ":" + xhttp.statusText + "'";
            }
        }
    };

    xhttp.onerror = function () { //on other error, show alert
        window.location = goTo + "?errorMessage='I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
    };
}

function getUser() {
    //build the request to REST API
    var xhttp = new XMLHttpRequest();
    url = urlMain;
    xhttp.open("GET", url);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader('Authorization', "Basic " + window.btoa(window.sessionStorage.getItem("apiUsername") + ":" + window.sessionStorage.getItem("apiPassword")));
    xhttp.send();
    
    xhttp.onload = function () {
        if (xhttp.status != 200) {
            return "I am sorry: " + xhttp.status + ":" + xhttp.statusText;
        }
    };

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            userData = JSON.stringify(xhttp.response);
            return JSON.stringify(xhttp.response);
        }
    };

    xhttp.onerror = function () {
        return "'I am sorry:" + xhttp.status + ":" + xhttp.statusText + "'";
    };
}

function checkLogin() {
    if (window.sessionStorage.getItem("email") == "" || window.sessionStorage.getItem("email") == null) return false;
    else return true;
}

function getIP(action) {
    let url = 'http://ip-api.com/json';
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send();
    //wait the execution to be ready or alert an error
    xhttp.onload = function () {
        if (xhttp.status != 200) { // analyze HTTP status of the response
            return "";
        }
    };
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            ipAddress = JSON.parse(xhttp.responseText).query;
            allIPData = JSON.stringify(xhttp.response);
            send(action, ipAddress, allIPData);
        }
    };
    xhttp.onerror = function () { //on other error, show alert
        return null;
    };
}