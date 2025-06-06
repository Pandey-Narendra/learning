// app.listen() already uses Node.js’s http module internally
// const http = require('http');

// ---------------------------------------------
    //  Express JS Starts
        // npm install --save-dev express
        // npm install --save express

        //  npm install --save ejs pug express-handlebars
// ---------------------------------------------

    // Used to set up global middleware, routes, error handlers, and start the server.
    const express = require('express');

    // This creates your main application object like
    // Use this to define routes, middleware, and how your server behaves.
    // It handles incoming requests, delegates them to different departments, and manages things like logging, security, or error handling

        // Set up middleware (app.use(...))
        // Define global routes (app.get(...))
        // Start the server (app.listen(...))

    const app = express();


    // This is like a modular sub-application that handles a specific group of routes.
    // Apply route-specific middleware
    // This creates a modular router — like a mini Express app.
    // Every department focuses on a specific area, has its own team (route handlers), and handles specific tasks.
    // They can operate independently and are later plugged into theconst app = express().
    // const router = express.Router();

// ---------------------------------------------
//      Express JS Ends
// ---------------------------------------------


// ---------------------------------------------
//      Middleware Starts
// ---------------------------------------------

    // ---------------------------------------------
        //  Body Parser Starts
    // ---------------------------------------------
       
        // This middleware will parse the data sent in POST requests (from forms, etc.)
        // It makes the data available on req.body as a JavaScript object.
        app.use(express.urlencoded({ extended: false }));

    // ---------------------------------------------
        //  Body Parser Ends
    // ---------------------------------------------

    // - Express supports all common HTTP methods: GET, POST, PUT, PATCH, DELETE, etc.

    // Middleware is a function that runs between when a request is received and before a response is sent.
    // It can modify the request (req) and response (res) objects or end the response.
    // app.use( (req, res, next) =>{
    //     console.log('In The Middleware');

    //     // `next()` is a function that passes control to the next middleware in the stack.
    //     next();
    // } );



    // This middleware will ONLY run when the request URL starts with "/welcome"
    app.use( '/welcome', (req, res, next) =>{
        console.log('In Other Middleware');

        // Send an HTML response to the client
        // res.send('<h1> Hello From My  Welcome Page </h1>');

        res.send('<form action="/message" method="POST"><input type="text" name="message" placeholder="write a message for me"><button type="submit">submit</button></form>');
    } );

    // This middleware will ONLY run when the request URL starts with "/message"
    // - We're using app.post() because we only want to handle POST requests,
    app.post( '/message', (req, res, next) =>{
        // Log the form data sent via POST
       console.log(req.body);

       // Redirect the user back to the home page after they submit the form.
       res.redirect('/');
    } );


    // This runs for the root path and any other request that hasn't been handled earlier.
    // Be cautious: app.use('/') matches everything that starts with '/', so it may override others if placed first.
    app.use( '/', (req, res, next) =>{
        console.log('In Other Middleware');

        // Send an HTML response to the client
        res.send('<h1> Hello From My Express JS </h1>');
    } );

// ---------------------------------------------
//      Middleware Ends
// ---------------------------------------------


// ---------------------------------------------
//   Start the server
// ---------------------------------------------


    // const server = http.createServer(app);
    // server.listen(3000); 

    // app.listen() is a shorthand method that internally calls http.createServer()
    app.listen(3000);