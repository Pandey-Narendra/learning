// path is used to path for files in our system as by default / is used as route parameter not to access the file.
// use this to construct absolute paths when serving files
const path = require('path');

// this gives us the main directory file location by using our helper folders path.js file
const rootDir = require('./utils/path');
// console.log('rootDir', rootDir);

// this is the main function that will be called when we run our server
const express = require('express');

// Use this to define routes, middleware, and how your server behaves.
// It handles incoming requests, delegates them to different departments, and manages things like logging, security, or error handling.
const app = express();

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // View Engine Configuration Starts
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // PUG Configuration starts
                    //  https://pugjs.org/api/getting-started.html
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // indentation must be properly set as pug works on the hierarchy

        // Set Pug as the template engine (also known as the view engine).
        // Pug allows you to render dynamic HTML pages on the server side using templates.
        // Its like a templating engine that allows you to embed JavaScript variables inside your HTML templates using #{}.
        // - With this setup, res.render('shop') will render views/shop.pug
        // app.set('view engine', 'pug');

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // PUG Configuration ends
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // Handlebars Configuration starts
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        // Import the express-handlebars package explicitly fron express framework
        // Its like a templating engine that allows you to embed JavaScript variables inside your HTML templates using {{}} like syntax in Laravel aslo.
        // const expressHandlebars = require('express-handlebars');

        // Register Handlebars as the view engine with Express
        // 'hbs' is the name we give this engine; express will use this name to look for views with .hbs extension
        // app.engine(
        //     'hbs', // file extension to use for views
        //     expressHandlebars({
        //         layoutsDir: 'basics/express_js/views/layouts/',      // Directory where layout files like main-layout.hbs are stored
        //         defaultLayout: 'main-layout',      // The default layout file to wrap around all rendered views
        //         extname: 'hbs'                     // File extension for views (instead of the default .handlebars)
        //     })
        // );

        // Set Handlebars as the default view engine so you can render views without specifying the file extension
        // - With this setup, res.render('shop') will render views/shop.hbs
        // app.set('view engine', 'hbs');

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // Handlebars Configuration starts
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // EJS Configuration starts
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        app.set('view engine', 'ejs');

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    // EJS Configuration starts
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Set the folder where your Pug template files are located.
    // This is where Express will look for `.pug` or `.hbs` files when rendering views.
    // app.set('views', 'views');
    app.set('views', path.join(rootDir, 'views'));


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// View Engine Configuration Ends
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Import Routes Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Importing all the Routes required for the application and middleware
    // const adminRoutes = require('./routes/admin');

    // Now we are going to export multiple Data Objects from the admin.js file
    const adminRoutes = require('./routes/admin');


    const shopRoutes = require('./routes/shop');

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Import Routes ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Middleware Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // This is where you can add middleware functions to handle requests and responses.
    // The order of the execution of the middleware is important.

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //  Body Parser Starts
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       
        // This middleware will parse the data sent in POST requests (from forms, etc.)
        // Parses incoming form data (x-www-form-urlencoded) and makes it available as req.body
        app.use(express.urlencoded({ extended: false }));

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //  Body Parser Ends
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
             // Serving Static Files (CSS, JS, Images, etc.)
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // `express.static()` is built-in middleware provided by Express.
        // It tells Express to **serve static files** from a specific directory — like CSS, JavaScript, images, etc.
        // Without this, the browser can’t access local static assets like stylesheets.
        app.use(express.static(path.join(rootDir, 'public')));

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            // Serving Static Files (CSS, JS, Images, etc.)
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    
    // using all the routes from admin
    //  /admin is prefix for all the routes in admin
    // app.use('/admin', adminRoutes);

    // here we are using the routes from admin.js file
    app.use('/admin', adminRoutes.routes);

    // using all the routes from shop
    // since shopRoutes routes use get method, it will only listen to the get request
    app.use(shopRoutes);

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //      Controllers Starts
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        const errorController = require('./controllers/errors');

        app.use('/', errorController.error404Page);

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //      Controllers Ends
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

    // using it for the default route
    // here use() would execute for all the HTTP methods not only accessing get method 
    // app.use('/', (req, res, next) => {
    //     // res.status(404).send('<h1>Page Not Found</h1>');

    //     // sendFile() is used send the html file in the response to the browers;
    //     // join() is a string fucntion used to join the path of the file with the current directory path;
    //     // status() is a function used to set the status of the resposne for the browser;
    //     // res.status(404).sendFile(path.join(rootDir, './', 'views', '404.html'));

    //     res.status(404).render('404', { title: 'Page Not Found', path: '/404'  });
    // });
   
   
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Middleware Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(3000);