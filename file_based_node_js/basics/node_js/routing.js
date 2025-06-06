const http = require('http');
const fs = require('fs');

const server =  http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');

        res.write('<head><title>Routing</title></head>');

        res.write('<body>');
        res.write('<h1>Say Hi, To My Node JS Sever</h1>');
        res.write(
            '<form action="/welcome" method="POST"> <input type= "text" name="message" placeholder="write message with your name" required /> <button type="submit">say hi</button>'
        );
        
        res.write('</form>');
        res.write('<body>');
        res.write('</html>');

        return res.end();
    }

    if(url === '/welcome' && method === 'POST'){
        
        // to store incoming request chunks as in node js, request is proceded in small chunks of data
        const requestBody = [];
        
        // stream (passenger) : this will not block the execution of the script, as it works asynchronously
        // for every incoming request it will bind event listner like event loop untill all the incoming data is recevied
        req.on('data', (chunk) => {

            // here we are not re-assigning any value to const variable, just manipulaing its inner data
            requestBody.push(chunk);

        });


        // buffer (bus stop) : this will not block the execution of the script, as it works asynchronously
        // once  the incoming request chunk is all received (an event listner is attached to request object for this purpose) then it executes
        // toString() as we already know that the request object is string
       
        // ----------------------------------------------------------------------------------------------------------------------------------------------------------
                        // for better code execution
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------

            // req.on('end', () => {
            //     const parserRequestBody = Buffer.concat(requestBody).toString();
            //     const data = parserRequestBody.split('=')[1];
            //     fs.writeFileSync('welcomeMessage.txt', data);
            // });

            // res.statusCode = 302;
            // res.setHeader('location','/');
            // return res.end();

        // ----------------------------------------------------------------------------------------------------------------------------------------------------------
                            // for better code execution
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------
        
        
        // using return here will wait untill it finish its execution 
        // return  req.on('end', () => {
        //     const parserRequestBody = Buffer.concat(requestBody).toString();
        //     const data = parserRequestBody.split('=')[1];
        //     fs.writeFileSync('welcomeMessage.txt', data);
        //     res.statusCode = 302;
        //     res.setHeader('location','/');
        //     return res.end();
        // });


        // ----------------------------------------------------------------------------------------------------------------------------------------------------------
                            // for better file handling
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------
            
            // using return here will wait untill it finish its execution 
            return  req.on('end', () => {
                const parserRequestBody = Buffer.concat(requestBody).toString();
                const data = parserRequestBody.split('=')[1];

                // sync will stop/block the execution of the code as JS is single threading langauge
                // fs.writeFileSync('welcomeMessage.txt', data);

                // now this will work as asynchrously without blocking the execution of the code and would return once all the code executed in task queue
                // worker pool --> trigger callback
                fs.writeFile('welcomeMessage.txt', data, error => {
                    res.statusCode = 302;
                    res.setHeader('location','/');
                    return res.end();
                });
            });

        // ----------------------------------------------------------------------------------------------------------------------------------------------------------
                            // for better file handling
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------
        
        

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Create Server</title></head>');
    res.write('<body><h1>Hello, This Is My First Node JS Server</h1></body>');
    res.write('</html>');  
    res.end();

});

server.listen(3000);