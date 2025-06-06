const mysql2 = require('mysql2');

const poolOfConnections = mysql2.createPool( {
    host: "localhost",
    user: "root",
    database: "node_js",
    password: ""
} );

module.exports = poolOfConnections.promise();