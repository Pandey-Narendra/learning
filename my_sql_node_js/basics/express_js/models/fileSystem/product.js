
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Import And Set Data And File Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const fs = require('fs');

    const rootDir = require('../utils/path');

    const p = rootDir + '/data/products.json';

    const Cart = require('./cart');

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Import And Set Data And File Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Helper Functions Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Callback() - it ensures we wait for the file read operation (which is asynchronous) before continuing, `fs.readFile()` is asynchronous — it takes time to complete.
    const getProductsFromFile = cb => {
        
        // If the file doesn't exist or has an error, return an empty array
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]); 
            } else {
                cb(JSON.parse(fileContent)); 
            }
        });

    };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Helper Functions Ends
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Products Model Class Definition Starts
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    module.exports = class Product {
        // this
        constructor(id, title, imageUrl, description, price) {
            this.id = id;
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
        }

        save() {
            
            getProductsFromFile(products => {
    
                // update
                if(this.id){
                    
                    // This will get existing product from the products callback
                    const existingProduct = products.findIndex(prod => prod.id === this.id);

                    // Spread all the products inside a updatedProducts
                    const updatedProducts = [...products]; 

                    // replace the old product with the new updated product (this), since products is array replace it using its index
                    updatedProducts[existingProduct]= this;

                    // console.log('updatedProducts', updatedProducts);

                    // update existingProduct  on the file
                    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                        // console.log('product.js model', err);
                    });
                }
                // new 
                else{
                    
                    this.id = Math.random().toString();
                    products.push(this);
                    
                    fs.writeFile(p, JSON.stringify(products), err => {
                        console.log('product.js model', err);
                    });
                }
            });
        }

        static fetchAll(cb) {
            getProductsFromFile(cb);
        }

        static getProduct(id, cb){
            
            getProductsFromFile(products => {
                const product = products.find( p => p.id === id);
                
                cb(product);

            });
        }

        delete() {
            
            getProductsFromFile(products => {
                const product = products.find(prod => prod.id === this.id);
                const updatedProducts = products.filter(prod => prod.id !== this.id);
                
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (!err) {
                        Cart.deleteProduct(product.id, product.price);
                    }
                });

            });
            
        }

    };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //      Products Model Class Definition Ends
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------