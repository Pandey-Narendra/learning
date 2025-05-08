const express = require('express');

// This is like a modular sub-application that handles a specific group of routes.
// Apply route-specific middleware
// This creates a modular router — like a mini Express app.
// Every department focuses on a specific area, has its own team (route handlers), and handles specific tasks.
// They can operate independently and are later plugged into theconst app = express().
const router = express.Router();


router.get( '/add-product', (req, res, next) =>{
    res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="write a title"><button type="submit">submit</button></form>');
} );


router.post( '/product', (req, res, next) =>{
   res.redirect('/');
} );


// This allows you to import and use these routes in your main app file (e.g., app.js)
module.exports = router;