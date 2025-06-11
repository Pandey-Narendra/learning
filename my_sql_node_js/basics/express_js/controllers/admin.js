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
        
        // Sequelize

        // Product.create({
        //     title: title,
        //     price: price,
        //     imageUrl: imageUrl,
        //     description: description
        // })

        // Accessing the user from session/middleware and create product for that user
        req.user.createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            // console.log('Created Product');
            return res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });


        // MySQL
        // const product = new Product(null, title, imageUrl, description, price);
        // product.postProduct()
        //     .then( () => { 
        //         res.redirect('/'); 
        //     } )
        //     .catch( (err) => {})
        // ;

    };

    exports.getProducts = (req, res, next) => {
        
        // Product.findAll()

        // fetch the product which belongs to the user
        req.user.getProducts()
            .then( (products) => {
                res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                });
            } )
            .catch( (err) => {} )
        ;

        // Product.getProducts()
            
        //     .then( ([products, productfield]) => {

        //         res.render('admin/products', {
        //             prods: products,
        //             pageTitle: 'Admin Products',
        //             path: '/admin/products'
        //         });

        //     } )
        //     .catch( (err) => {

        //     } )
        // ;
    };

    exports.getEditProduct = (req, res, next) => {
        
        const productId = req.params.productId;

        // Sequelize

        // Product.findByPk(productId)

        // fetch the user product of matching id
        req.user.getProducts( { where: { id: productId } } )
            .then( (products) => {
                const product = products[0];

                if(!product){
                    res.redirect('/');
                }

                res.render('admin/edit-product', {
                    product: product, 
                    pageTitle: 'Update Product', 
                    path: '/admin/edit-product'
                });
            } )
            .catch( (err) => {
                // console.log(err);
            } )
        ;


        // MySQL
        // Product.getProduct(productId, product => {
            
        //     res.render('admin/edit-product', {
        //         pageTitle: 'Edit Product',
        //         path: '/admin/edit-product',
        //         product: product
        //     });

        // });

    };

    exports.postEditProduct = (req, res, next) => {
        
        const productId = req.body.productId;
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;

        // Sequelize
        Product.findByPk(productId)
            .then(  (product) => {
                product.title = title;
                product.price = price;
                product.imageUrl = imageUrl;
                product.description = description;
                return product.save();
            } )
            .then(() => {
                res.redirect('/admin/products');
            } )
            .catch( (err) => {} )
        ;

        // MySql
        // initiated new project object and bind its all methods
        // const UpdateProduct = new Product(productId, title, imageUrl, price, description);
        // UpdateProduct.postProduct();

        // console.log(UpdateProduct, 'admin js controller postEditProduct');
        
    };

    exports.deleteProduct = (req, res, next) => {
        const productId = req.body.productId;

        // MySql
        Product.findByPk(productId)
            .then(  (product) => {
                return product.destroy();
                
            } )
            .then(() => {
                res.redirect('/admin/products');
            } )
            .catch( (err) => {} )
        ;

        // MySQL
        // const deleteProduct = new Product(productId);
        // deleteProduct.delete();

        // File System
        // Product.delete(productId)
        
        // res.redirect('/admin/products');
    }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //       Admin Controller Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  

