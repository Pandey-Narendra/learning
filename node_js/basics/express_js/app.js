
const express = require('express');

// Use this to define routes, middleware, and how your server behaves.
// It handles incoming requests, delegates them to different departments, and manages things like logging, security, or error handling.
const app = express();


// ---------------------------------------------
//  Import Routes Starts
// ---------------------------------------------

    // Importing all the Routes required for the application and middleware
    const adminRoutes = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

// ---------------------------------------------
//  Import Routes ends
// ---------------------------------------------


// ---------------------------------------------
//      Middleware Starts
// ---------------------------------------------

    // This is where you can add middleware functions to handle requests and responses.
    // The order of the execution of the middleware is important.

    // ---------------------------------------------
        //  Body Parser Starts
    // ---------------------------------------------
       
        // This middleware will parse the data sent in POST requests (from forms, etc.)
        // Parses incoming form data (x-www-form-urlencoded) and makes it available as req.body
        app.use(express.urlencoded({ extended: false }));

    // ---------------------------------------------
        //  Body Parser Ends
    // ---------------------------------------------


    // using all the routes from admin
    app.use(adminRoutes);

    // using all the routes from shop
    app.use(shopRoutes);
   
// ---------------------------------------------
//      Middleware Ends
// ---------------------------------------------

app.listen(3000);