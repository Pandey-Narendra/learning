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
        
        // MongoDB
        Product.getProducts()
            
            .then( (products) => {
                res.render('shop/product-list', {
                    prods: products,
                    pageTitle: 'All Products',
                    path: '/products'
                });

            } )
            .catch( (err) => {
                console.log(err);
            } )

        ;


        // Sequelize
        // Product.findAll()
        //     .then((products) => {
        //         res.render('shop/product-list', {
        //             prods: products,
        //             pageTitle: 'All Products',
        //             path: '/products'
        //         });
        //     })
        //     .catch((err) => { console.log(err); })
        // ;

        // MySql
        // Product.getProducts()
            
        //     .then( ([products, productsfield]) => {

        //         res.render('shop/product-list', {
        //             prods: products,
        //             pageTitle: 'All Products',
        //             path: '/products'
        //         });

        //     } )
        //     .catch( (err) => {

        //     } )
        // ;
    };

    exports.getProduct = (req, res, next) => {
        const productId = req.params.id;
    
        // MongoDB
        Product.getProduct(productId)
            
            .then( (product) => {
                
                res.render('shop/product-detail', {
                    product: product, 
                    pageTitle: product.title, 
                    path: '/products'
                });
                
            } )
            .catch( (err) => {
            
            } )
        ;


        // Sequelize
        // Product.findByPk(productId)
        //     .then( (product) => {
        //         res.render('shop/product-detail', {
        //             product: product, 
        //             pageTitle: product.title, 
        //             path: '/products'
        //         });
        //     } )
        //     .catch( (err) => {
        //         // console.log(err);
        //     } )
        // ;


        // MySQL
        // Product.getProduct(productId)
        //     .then( ([product, field]) => {
        //         res.render('shop/product-detail', {
        //             product: product[0], 
        //             pageTitle: product[0].title, 
        //             path: '/products'
        //         });
        //     } )
        //     .catch( (err) => {console.log(err, 'shop.js controller err');} )
        // ;
       
    }

    exports.getIndex = (req, res, next) => {

        // MongoDB
        Product.getProducts()
            
            .then( (products) => {
                res.render('shop/index', {
                    prods: products,
                    pageTitle: 'Shop',
                    path: '/'
                });

            } )
            .catch( (err) => {
                console.log(err);
            } )

        ;

        
        // Sequelize
        // Product.findAll()
        //     .then((products) => {
        //         res.render('shop/index', {
        //             prods: products,
        //             pageTitle: 'Shop',
        //             path: '/'
        //         });
        //     })
        //     .catch((err) => { console.log(err); })
        // ;

        // MySql
        // Product.getProducts()
            
        //     .then( ([products, productsfield]) => {

        //         res.render('shop/index', {
        //             prods: products,
        //             pageTitle: 'Shop',
        //             path: '/'
        //         });

        //     } )
        //     .catch( (err) => {

        //     } )
        // ;
    };

    exports.getCart = (req, res, next) => {

        // Sequelize
        // fetch the cart which belongs to the user using middleware and Sequelize
        req.user.getCart()
            .then( (cart) => {

                // fetch all the products which belongs to the cart using relationship
                return cart.getProducts()
                    .then( (products) => {
                        res.render('shop/cart', {
                            path: '/cart',
                            pageTitle: 'Your Cart',
                            products : products
                        });
                    } )
                    .catch( (err) => {} );
                ;
            } )
            .catch( (err) => {} )
        ;


        // res.render('shop/cart', {
        //     path: '/cart',
        //     pageTitle: 'Your Cart'
        // });
    };

    exports.postCart = (req, res, next) => {
        const productId = req.body.productId;
        
        let userCart;
        let newQuantity = 1;
        
        // Sequelize
        // fetch the cart which belongs to the user using middleware and Sequelize
        req.user.getCart()
            .then( (cart) => {
                userCart = cart;

                // fetch the product if exists in the cart
                return cart.getProducts( { where : { id : productId } } );
            } )
            .then( (products) => {
                
                let product;
                if ( products.length > 0 ) {
                    product = products[0];
                }

                // if product already exists in the cart then just increment the quantity of that product in Cart
                if(product){
                    const currentQuantity = product.cartItem.quantity;
                    newQuantity = currentQuantity + 1;
                    return product;

                    // return  userCart.addProduct(product, {
                    //     through : {quantity : newQuantity}
                    // });
                }
                
                return Product.findByPk(productId);
                // res.redirect('/cart');
            } )
            
                // Add the new product to the cart using Sequelize function addProduct() and set the quantity of product
                //  as 1 through relationship 
            .then( (product) => {
                
                return userCart.addProduct(product, {
                    through : {quantity : newQuantity}
                });

            } )
            .then( () => {
                res.redirect('/cart');
            } ) 
            .catch( (err) => {} );
        ;

        // Product.getProduct(productId, product => {
        //     Cart.addProduct(productId, product.price);
        // });
        
    };

    exports.deleteCart = (req, res, next) => {
        const productId = req.body.productId;

        // Sequelize
        req.user.getCart()
            .then( (cart) => {
                return cart.getProducts( { where : { id : productId }  } );
            } ) 
            .then( (products) => { 
                const product = products[0];
                return product.cartItem.destroy();
            } )
            .then( (result) => {
                res.redirect('/cart');
            } )
            .catch( (err) => { } )

        ;
            
        // const productPrice = req.body.productPrice;
        // Cart.deleteProduct(productId, productPrice);
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
