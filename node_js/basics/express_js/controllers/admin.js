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
        
        const product = new Product(null, title, imageUrl, description, price);
        product.postProduct()
            .then( () => { 
                res.redirect('/'); 
            } )
            .catch( (err) => {})
        ;

    };

    exports.getProducts = (req, res, next) => {
        
        Product.getProducts()
            
            .then( ([products, productfield]) => {

                res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                });

            } )
            .catch( (err) => {

            } )
        ;
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
        
        const productId = req.body.productId;
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;

        // initiated new project object and bind its all methods
        const UpdateProduct = new Product(productId, title, imageUrl, price, description);
        UpdateProduct.postProduct();

        // console.log(UpdateProduct, 'admin js controller postEditProduct');
        
        res.redirect('/admin/products');
    };

    exports.deleteProduct = (req, res, next) => {
        const productId = req.body.productId;

        const deleteProduct = new Product(productId);
        deleteProduct.delete();

        // Product.delete(productId)
       
        res.redirect('/admin/products');
    }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //       Admin Controller Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  

