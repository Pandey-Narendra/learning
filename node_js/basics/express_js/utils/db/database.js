// npm install --save mysql2

// const mysql2 = require('mysql2');

// const poolOfConnections = mysql2.createPool( {
//     host: "localhost",
//     user: "root",
//     database: "node_js",
//     password: ""
// } );

// module.exports = poolOfConnections.promise();


// npm install --save sequelize


const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_js', 'root', '', { 
    dialect: 'mysql',
    host: 'localhost' 
});

module.exports = sequelize;