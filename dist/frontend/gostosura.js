var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Origin", "externo");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "password");
urlencoded.append("username", "danabanana");
urlencoded.append("password", "xupetinha");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://api.moblix.com.br/api/Token", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));