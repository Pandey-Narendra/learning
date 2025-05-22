// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      In-Memory Product Store
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // A temporary array to store product data in memory
    // In a real-world app, this would be replaced by a database
    // const products = [];

    // Optionally export the products array if needed in other files (currently commented out)
    // exports.products = products;

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //      Model for products starts
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        const Product = require('../models/product');
        // console.log('product model', Product);

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //      Model for products ends
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controller Function to Render the Add Product Form
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // This function handles GET requests to render the "Add Product" page
    // It sends a view (e.g., add-product.ejs, .pug, or .hbs depending on setup) with some dynamic data
    exports.AddProduct = (req, res, next) => {
        res.render('admin/add-product', {
            title: 'Add Product',               
            path: '/admin/add-product',         
            formsCSS: true,                     
            productCSS: true,                   
            activeAddProduct: true             
        });
    };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controller Function to Handle Form Submission (Save Product)
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // This function handles POST requests from the Add Product form
    // It extracts data from the request body and stores it in the `products` array
    // Then redirects the user back to the home/shop page
    exports.saveProduct = (req, res, next) => {
        // products.push({ title: req.body.title });  
        const product = new Product(req.body.title);
        product.save();
        res.redirect('/');                         
    };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Controller Function to Display Products on Shop Page
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // This function handles GET requests to the shop (home) page
    // It renders the shop view and passes the products array to the template
    exports.showProducts = (req, res, next) => {

        //  A callback is a function passed as an argument to another function.
        // It gets executed after some work is done (e.g., reading from a database, file, or memory).
        // `fetchAll()` may eventually fetch data asynchronously (like from a file or database).
        // Using a callback prepares the function to handle asynchronous logic without blocking the app.

        Product.fetchAll(products => {
            res.render('shop/product-list', {
                prods: products,                  
                title: 'Shop',                 
                path: '/',                        
                hasProducts: products.length > 0, 
                activeShop: true,                 
                productCSS: true              
            });
        });


        // res.render('shop', {
        //     prods: products,                  
        //     title: 'Shop',                 
        //     path: '/',                        
        //     hasProducts: products.length > 0, 
        //     activeShop: true,                 
        //     productCSS: true              
        // });
    };
