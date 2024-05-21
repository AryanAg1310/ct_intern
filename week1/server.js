import http from 'http';
http.createServer(function (req, res) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
   // res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body as "Hello, World !!!"
    res.end(' hello world !!! \n');
 }).listen(8000);
