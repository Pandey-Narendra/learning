const fs = require('fs');

const rootDir = require('../utils/path');
const p = rootDir + '/data/cart.json';

module.exports = class Cart {

  	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			// Analyze the cart => Find existing product
			const existingProductIndex = cart.products.findIndex(
				prod => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			// Add new product/ increase quantity
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			
			cart.totalPrice = cart.totalPrice + +productPrice;
			
			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err);
			});
		});
  	}

	static deleteProduct(id, productPrice){
		
		fs.readFile(p, (err, fileContent) => {
			
			if(err){
				return;
			}

			const cart = { ...JSON.parse(fileContent) };

			const existingProduct = cart.products.find(prod => prod.id === id );

			if(existingProduct){
				existingProduct['qty'] = existingProduct.qty - 1;
				cart['totalPrice'] = cart.totalPrice - productPrice;

				if(existingProduct['qty'] === 0){
					const updatedProduct = cart.products.filter( prod => prod.id !== existingProduct.id );
					cart['products'] = updatedProduct;
					cart['totalPrice'] = cart.totalPrice;
				}

				fs.writeFile(p, JSON.stringify(cart), err => {
					console.log(err);
				});
			}

			

		});

	}
};
