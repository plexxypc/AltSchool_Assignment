const express = require('express');
const logger = require('morgan');
const authorRouter = require('./authorRouter');

const app = express();

// Middleware for logging requests
app.use(logger('dev'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Mount the Author Router
app.use('/authors', authorRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Express App');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
