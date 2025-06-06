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
        
        Product.fetchAll(products => {
            res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
            });
        });
    };

    exports.getProduct = (req, res, next) => {
        const productId = req.params.id;
    
        Product.getProduct(productId, product => {
            res.render('shop/product-detail', {product: product, pageTitle: product.title, path: '/products'});
        });
    }

    exports.getIndex = (req, res, next) => {
        
        Product.fetchAll(products => {

            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        });
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
