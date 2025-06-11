// -----------------------------------------------------
// Utility to Get the Root Directory of the Project
// -----------------------------------------------------

    // Node.js core module for working with file and directory paths.
    // We use this to construct absolute file paths across platforms.
    // This is important because `/` is treated as a route in URLs, not as a file path separator.
    const path = require('path');

    // Older versions of Node.js used `process.mainModule.filename`, but it's now deprecated.
    // Modern approach uses `require.main.filename` to get the main executing file’s full path.

    // `path.dirname(...)` extracts the directory path from that full path.
    // This gives us the absolute path to the root of the project — typically where app.js lives.
    module.exports = path.dirname(require.main.filename);


// -----------------------------------------------------
// Utility to Get the Root Directory of the Project 
// -----------------------------------------------------