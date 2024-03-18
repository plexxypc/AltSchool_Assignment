const http = require('http');
const url = require('url');

// Sample data
let books = [
    { id: 1, title: "Breaking the Barriers of Web3: Crypto, DeFi & Exchanges", author: "Author 1" },
    { id: 2, title: "Gambling Effects: The Positives & Negatives", author: "Author 2" },
    { id: 3, title: "Who Comes First: Mother or Child? A Case For & Against Abortion", author: "Author 3" }
];

let authors = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
    { id: 3, name: "Author 3" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Extract authentication credentials from headers
    const authHeader = req.headers.authorization;
    const [username, password] = authHeader ? Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':') : ['', ''];

    // Clear request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        switch (path) {
            case '/books':
                handleBooksEndpoint(req.method, res);
                break;
            case '/authors':
                handleAuthorsEndpoint(req.method, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Not Found" }));
        }
    });
});

function handleBooksEndpoint(method, res) {
    switch (method) {
        case 'GET':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "GET request for books endpoint" }));
            break;
        case 'POST':
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "POST request for books endpoint" }));
            break;
        case 'PUT':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "PUT request for books endpoint" }));
            break;
        case 'PATCH':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "PATCH request for books endpoint" }));
            break;
        case 'DELETE':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "DELETE request for books endpoint" }));
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
}

function handleAuthorsEndpoint(method, res) {
    switch (method) {
        case 'GET':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "GET request for authors endpoint" }));
            break;
        case 'POST':
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "POST request for authors endpoint" }));
            break;
        case 'PUT':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "PUT request for authors endpoint" }));
            break;
        case 'PATCH':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "PATCH request for authors endpoint" }));
            break;
        case 'DELETE':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "DELETE request for authors endpoint" }));
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
