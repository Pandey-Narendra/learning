// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Model for products starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    const Product = require('../models/product');

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Model for products ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //      Admin Controller Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    exports.getAddProduct = (req, res, next) => {
        res.render('admin/add-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
    };

    exports.postAddProduct = (req, res, next) => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product(title, imageUrl, description, price);
        product.save();
        res.redirect('/');
    };

    exports.getProducts = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
            });
        });
    };

    exports.getEditProduct = (req, res, next) => {
        
        const productId = req.params.productId;

        Product.getProduct(productId, product => {
            
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product
            });

        });

    };

    exports.postEditProduct = (req, res, next) => {
        
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const productId = req.body.productId;

        console.log(title, imageUrl, price, description,productId, 'admin js controller postEditProduct');
        
        res.redirect('/');
    };


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //       Admin Controller Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  

