const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response) {
    
    fs.readFile('chatbot-interface.html', function(err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Error: File not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        }
    });
});




const port = process.env.PORT || 1337;
server.listen(port);

console.log(`Server running at http://localhost:${port}`);
