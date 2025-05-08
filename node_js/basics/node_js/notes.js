const fs = require('fs');

fs.writeFileSync('notes.txt', 'Node.js, a JavaScript runtime that allows the execution of JavaScript outside of the browser, specifically on servers or any machine.\n\n' 
                    + 'Some browser-specific features (like DOM interaction) are unavailable, as Node.js does not run in a browser context.\n\n'
                    + 'Requests are sent to servers, which process these requests and return responses (typically in HTML, CSS, or JavaScript).\n\n'
                    + 'Node.js is a JavaScript runtime, allowing developers to write server-side code using JavaScript and also  client sides.'
                );