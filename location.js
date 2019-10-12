function httpGet(theUrl)
{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

console.log(httpGet("https://us1.locationiq.com/v1/reverse.php?key=832a21a69202bb&lat=43.561298&lon=-83.983681&format=json"))
