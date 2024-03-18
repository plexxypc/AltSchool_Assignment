const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Sample data
let books = [
    { id: 1, title: "Breaking the Barriers of Web3: Crypto, DeFi & Exchanges", author: "Author 1" },
    { id: 2, title: "Gambling Effects: The Positives & Negatives", author: "Author 2" },
    { id: 3, title: "Who Comes First: Mother or Child? A Case For & Against Abortion", author: "Author 3" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    switch (path) {
        case '/books':
            if (req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(books));
            } else if (req.method === 'PUT') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const data = JSON.parse(body);
                    books.push(data);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Book added successfully" }));
                });
            } else if (req.method === 'DELETE') {
                books = [];
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "All books deleted" }));
            }
            break;
        case '/books/author':
            if (req.method === 'GET') {
                const author = query.author;
                const authorBooks = books.filter(book => book.author === author);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(authorBooks));
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const data = JSON.parse(body);
                    const authorBooks = books.filter(book => book.author === data.author);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(authorBooks));
                });
            } else if (req.method === 'PUT') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const data = JSON.parse(body);
                    books.forEach(book => {
                        if (book.author === data.author) {
                            Object.assign(book, data);
                        }
                    });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Books updated successfully" }));
                });
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Not Found" }));
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

