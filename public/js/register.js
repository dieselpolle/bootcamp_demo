function sendData() {
    email = document.getElementById("email").value;
    psw = document.getElementById("psw").value;
    
    //TODO
    //PUT THESE TO CONFIG FILE!!!!!!!!!!!!
    var url = "http://localhost:3000/user";
    var username = "APIuser";
    var password = "APIsecretPass";

    var base64Credentials = window.btoa(username + ":" + password);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + base64Credentials);
    var requestParams = {"username":email,"password":psw,"email":email};
    xhttp.send(JSON.stringify(requestParams));
}
function login() {
    console.log("login");
}