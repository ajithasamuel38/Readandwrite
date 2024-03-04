const http = require('http');
const fs = require('fs');
 const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile('message.txt', {encoding: "utf-8"}, (err, data) =>{
            if(err){
                console.log(err);
            }
            console.log(data);
        
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="message" method="POST"><input type="text" name="message"><button type="Submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    })
    }

    else if(url==='/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', ()=>{
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=>{
                if(err){
                    
                    console.log(err);
                }
                res.statusCode = 302;
                   res.setHeader('Location', '/');
                    return res.end();
                
            });
           
        })   
        
        }
 

       /* req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            
            
        })*/

       else{

        res.setHeader ('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><head>');
        res.write('<body><h1> Welcome to my Node Js project </h1></body>');
        res.write('</html>');
        res.end();
        
       } 
       
    
 })
 server.listen(3000);
