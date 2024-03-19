const express = require('express');
const router = express.Router();

// Sample data for authors
let authors = [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
    { id: 3, name: "Author 3" }
];

// GET all authors
router.get('/', (req, res) => {
    res.json(authors);
});

// GET a single author by ID
router.get('/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(author => author.id === authorId);
    if (!author) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        res.json(author);
    }
});

// POST a new author
router.post('/', (req, res) => {
    const { name } = req.body;
    const newAuthor = { id: authors.length + 1, name };
    authors.push(newAuthor);
    res.status(201).json({ message: 'Author created successfully', author: newAuthor });
});

// PUT update an existing author
router.put('/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const { name } = req.body;
    const authorIndex = authors.findIndex(author => author.id === authorId);
    if (authorIndex === -1) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        authors[authorIndex].name = name;
        res.json({ message: 'Author updated successfully', author: authors[authorIndex] });
    }
});

// DELETE an author
router.delete('/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const authorIndex = authors.findIndex(author => author.id === authorId);
    if (authorIndex === -1) {
        res.status(404).json({ message: 'Author not found' });
    } else {
        authors.splice(authorIndex, 1);
        res.json({ message: 'Author deleted successfully' });
    }
});

module.exports = router;
