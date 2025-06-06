// path is used to path for files in our system as by default / is used as route parameter not to access the file.
// use this to construct absolute paths when serving files
const path = require('path');

// This helper file gives us the path of the our working root directory application  using path.js as a helper function 
const rootDir = require('../utils/path');

const express = require('express');

// This is like a modular sub-application that handles a specific group of routes.
// Apply route-specific middleware
// This creates a modular router — like a mini Express app.
// Every department focuses on a specific area, has its own team (route handlers), and handles specific tasks.
// They can operate independently and are later plugged into theconst app = express().
const router = express.Router();

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controllers Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const productController = require('../controllers/shop');

    router.get('/add-product', productController.AddProduct );
    router.post('/add-product', productController.saveProduct );
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controllers Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// to store incoming request Data and use throught the App without using any DB.
// const products = [];

// // router.get('/add-product', (req, res, next) =>{
// //     // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="write a title"><button type="submit">submit</button></form>');
    
// //     // sendFile() is used send the html file in the response to the browers;
// //     // join() is a string fucntion used to join the path of the file with the current directory path;

// //     // Normal way of sending file
// //     // res.sendFile(path.join(rootDir, './', 'views', 'add-product.html'));

// //     // .pug way of sending file
// //     // used to render a dynamic HTML page using the Pug template engine instead of hardcoded html
// //     // res.render('add-product', { title: 'Add Product', path: '/admin/add-product' });

// //     // .hbs way of sending file
// //     // .hbs is used to render the template using the handlebars template engine
// //     // It is a good practice to keep the logic in the controller or main code and not in the view
// //     res.render('add-product', { title: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
    
// // } );


// router.post('/add-product', (req, res, next) =>{
//     // console.log(req);
//     products.push( {title : req.body.title} );
//     // console.log(products);
    
//    res.redirect('/');
// } );


// This allows you to import and use these routes in your main app file (e.g., app.js)
// Default Exports
// module.exports = router;


// Named Exports
exports.routes = router;
// exports.products = products;