const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3000;
const ROOT_DIR = './files';

// Create the root directory if it doesn't exist
if (!fs.existsSync(ROOT_DIR)) {
  fs.mkdirSync(ROOT_DIR);
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Handle file creation
  if (method === 'POST' && url === '/create') {
    const filename = req.headers['filename'];
    const fileContent = '';
    req.on('data', (chunk) => {
      fileContent += chunk;
    });
    req.on('end', () => {
      const filePath = path.join(ROOT_DIR, filename);
      fs.writeFileSync(filePath, fileContent);
      res.statusCode = 201;
      res.end(`File created: ${filename}`);
    });
  }

  // Handle file reading
  else if (method === 'GET' && url.startsWith('/read/')) {
    const filename = url.substring(6);
    const filePath = path.join(ROOT_DIR, filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      res.statusCode = 200;
      res.end(fileContent);
    } else {
      res.statusCode = 404;
      res.end(`File not found: ${filename}`);
    }
  }

  // Handle file deletion
  else if (method === 'DELETE' && url.startsWith('/delete/')) {
    const filename = url.substring(8);
    const filePath = path.join(ROOT_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.statusCode = 200;
      res.end(`File deleted: ${filename}`);
    } else {
      res.statusCode = 404;
      res.end(`File not found: ${filename}`);
    }
  }

  // Handle unknown requests
  else {
    res.statusCode = 404;
    res.end('Unknown request');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});