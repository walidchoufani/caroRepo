/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 // First, we'll require the HTTP library to use later.
var http = require("http");

// Let's say your script is expecting an http request parameter called 'myName',
// this is how you can retrieve it
var name = request.parameters.myName

// Suppose you want to make that available to all the instances of the current script
// then you can store it in a local persistent variable.
if (name != null) storage.local.theName = name

// The value of 'storage.local.theName' is automatically stored in a persistent database.
// So from now on, it will be available in all instances of the script therefore,
// you will not have to pass it as an http request parameter again.
// 'storage.global' will extend the scope of your persitent variable to all your other scripts to read and modify.

// Now we can obtain the client IP from the http request header.
var ip = request.headers["x-forwarded-for"];

// And build a request object to make an HTTP call to our simple hello service that will lookup the location the call came from.
var requestObject = {
    "url": "http://www.scriptr.io/hello",
    "params": {"ip": ip},
    "method": "POST" // the method is optional, it defaults to GET.
}

// ... and now we issue the request.
var response = http.request(requestObject);
if(response.status == "200"){
    var result = JSON.parse(response.body);
    var country = result.country;
}

// Finally, construct your response and return it.
var scriptResponse = "Hello";
if(storage.local.theName != null) scriptResponse += " " + storage.local.theName;
if(country != null) scriptResponse += " from " + country;
scriptResponse += "!";

return scriptResponse;			   				   							