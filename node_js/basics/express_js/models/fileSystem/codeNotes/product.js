
const fs = require('fs');

// const path = require('path');
// const products  = [];
// const p = [].join(rootDir,'data', 'products.json');

const rootDir = require('../utils/path');
const p = rootDir + '/data/products.json';

// Callback() - it ensures we wait for the file read operation (which is asynchronous) before continuing, `fs.readFile()` is asynchronous — it takes time to complete.
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    
    if (err) {
      cb([]); // If the file doesn't exist or has an error, return an empty array
    } else {
      cb(JSON.parse(fileContent)); // Parse the JSON content in either object or array and pass to the callback
    }
  });
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//      Product Class Definition
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = class Product {
    constructor(t){
        // console.log(this.title, 'this.title');
        this.title = t;
    }

    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                // console.log(err);
            });
        });

        // const p = [].join(rootDir,'data', 'products.json');
        // const p = rootDir + '/data/products.json';
        // console.log(p);
        // products.push(this);
        // console.log(this.title, 'this.title');
        // console.log(products, 'products []');
    }

    static fetchAll(cb){
        getProductsFromFile(cb); // Pass the callback directly to handle the async result
        // return products;
    }
}