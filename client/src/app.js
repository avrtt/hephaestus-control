const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            fs.createReadStream(filePath).pipe(res);
        }
        else if (fileExt == '.js') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/js');
            fs.createReadStream(filePath).pipe(res);
        }
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
