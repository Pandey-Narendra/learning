const http = require('http');

// to create server 

// 1st normal way
// function listenIncomingRequests(requestObject, responseObject){
    // console.log('creating Node JS server');
    // console.log(requestObject);
    // console.log(responseObject);
// }
// const server = http.createServer(listenIncomingRequests);


// 2nd use annonmaus function way
// const server = http.createServer(function(requestObject, responseObject){
    // console.log('creating Node JS server');
    // console.log(requestObject);
    // console.log(responseObject);
// });


// 3rd use next gen arrow fucntion function way

// Event Loop : to continous listen the incoming event listeners which are registered
//  node js executes this as single threaded javascript
const server = http.createServer( (requestObject, responseObject) => {
   
    console.log('creating Node JS server');


    //  request object recieved from localhost:3000
    console.log(requestObject.url, requestObject.method, requestObject.headers);

    
    //  response object to return to localhost:3000
    // console.log(responseObject); // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
    responseObject.setHeader('Content-Type', 'text/html');
    responseObject.write('<html>');
    responseObject.write('<head><title>Create Server</title></head>');
    responseObject.write('<body><h1>Hello, This Is My First Node JS Server</h1></body>');
    responseObject.write('</html>');  
    responseObject.end();   
    

    // to stop event loop from being continously executed/listening to event listeners
    process.exit();
});


server.listen(3000); // now open localhost:3000 on brower, so this server can listen to that incoming request