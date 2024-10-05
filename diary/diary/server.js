const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    // Read the requested file path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Check if the requested file exists
    fs.exists(filePath, exists => {
        if (exists) {
            // Read the file content
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    // Set the appropriate content type based on file extension
                    let contentType = 'text/html';
                    if (filePath.endsWith('.css')) {
                        contentType = 'text/css';
                    } else if (filePath.endsWith('.js')) {
                        contentType = 'text/javascript';
                    }

                    // Send the file content with appropriate content type
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        } else {
            // If the file does not exist, send a 404 Not Found response
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
