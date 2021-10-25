function sendData() {
    email = document.getElementById("email").value;
    psw = document.getElementById("psw").value;
    
    //TODO
    //PUT THESE TO CONFIG FILE!!!!!!!!!!!!
    var url = "https://mikko-bootcamp-backend.herokuapp.com/user";
    var username = "APIuser";
    var password = "APIsecretPassPASS";

    var base64Credentials = window.btoa(username + ":" + password);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + base64Credentials);
    var requestParams = {"username":email,"password":psw,"email":email};
    xhttp.send(JSON.stringify(requestParams));
}
function sendRequestForAuth() {
    email = document.getElementById("email").value;
        
    //TODO
    //PUT THESE TO CONFIG FILE!!!!!!!!!!!!
    var url = "https://mikko-bootcamp-backend.herokuapp.com/user";
    var username = "APIuser";
    var password = "APIsecretPassPASS";

    var base64Credentials = window.btoa(username + ":" + password);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + base64Credentials);
    var requestParams = {"username":email,"email":email};
    xhttp.send(JSON.stringify(requestParams));

    window.open("login.html?info='Wait for confirmation email send to "+email+" and login by your email and password.", "_self");
}