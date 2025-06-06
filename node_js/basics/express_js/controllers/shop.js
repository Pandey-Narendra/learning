// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Model for products starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    const Product = require('../models/product');
    const Cart = require('../models/cart');

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Model for products ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //      shop Controller Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    exports.getProducts = (req, res, next) => {
        
        Product.getProducts()
            
            .then( ([products, productsfield]) => {

                res.render('shop/product-list', {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/products'
                });

            } )
            .catch( (err) => {

            } )
        ;
    };

    exports.getProduct = (req, res, next) => {
        const productId = req.params.id;
    
        Product.getProduct(productId)
            .then( ([product, field]) => {
                res.render('shop/product-detail', {
                    product: product[0], 
                    pageTitle: product[0].title, 
                    path: '/products'
                });
            } )
            .catch( (err) => {console.log(err, 'shop.js controller err');} )
        ;
       
    }

    exports.getIndex = (req, res, next) => {
        
        Product.getProducts()
            
            .then( ([products, productsfield]) => {

                res.render('shop/index', {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/'
                });

            } )
            .catch( (err) => {

            } )
        ;
    };

    exports.getCart = (req, res, next) => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart'
        });
    };

    exports.postCart = (req, res, next) => {
        const productId = req.body.productId;
        
        Product.getProduct(productId, product => {
            Cart.addProduct(productId, product.price);
        });
        
        res.redirect('/cart');
    };

    exports.deleteCart = (req, res, next) => {
        const productId = req.body.productId;
        const productPrice = req.body.productPrice;
        // console.log('shop.js controller delete cart', productId, productPrice);

        Cart.deleteProduct(productId, productPrice);
        res.redirect('/');
    };

    exports.getOrders = (req, res, next) => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders'
        });
    };

    exports.getCheckout = (req, res, next) => {
        res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
        });
    };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //       Shop Controller Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
