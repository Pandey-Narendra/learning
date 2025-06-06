// path is used to path for files in our system as by default / is used as route parameter not to access the file.
// use this to construct absolute paths when serving files
const path = require('path');

// This helper file gives us the path of the our working root directory application  using path.js as a helper function 
const rootDir = require('../utils/path');

const express = require('express');

const router = express.Router();



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controllers Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const productController = require('../controllers/shop');

    router.get('/', productController.showProducts);
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controllers Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// importing admin data from admin.js file
// const adminData = require('./admin'); 

// router.get( '/', (req, res, next) =>{
//     // res.send('<h1> Hello, this is my shop page </h1>');
    
//     // console.log('shop.js', adminData.products);

//     // sendFile() is used send the html file in the response to the browers;
//     // join() is a string fucntion used to join the path of the file with the current directory path;

//     // normal way of sending file
//     // res.sendFile(path.join(rootDir, './', 'views', 'shop.html'));
    
//     // .pug way of sending file
//     // used to render a dynamic HTML page using the Pug template engine instead of hardcoded html
//     // res.render('shop', {prods: adminData.products, title: 'Shop', path: '/' });

//     // .hbs way of sending file
//     // .hbs is used to render the template using the handlebars template engine
//     // It is a good practice to keep the logic in the controller or main code and not in the view
//     res.render('shop', {
//         prods: adminData.products,
//         title: 'Shop',
//         path: '/',
//         hasProducts: adminData.products.length > 0,
//         activeShop: true,
//         productCSS: true
//     });

// } );

module.exports = router;