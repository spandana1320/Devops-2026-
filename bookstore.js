const express = require('express');
const app = express();

/* ---------- Middleware ---------- */
app.use(express.json());

/* ---------- In-Memory Books Data ---------- */
let books = [
    { id: 1, title: "Node.js Basics", author: "Alex", price: 500 },
    { id: 2, title: "Python Programming", author: "John", price: 650 }
];

/* ---------- Home Route ---------- */
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Online Bookstore API"
    });
});

/* ---------- GET All Books ---------- */
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

/* ---------- POST Add New Book ---------- */
app.post('/books', (req, res) => {

    const { id, title, author, price } = req.body;

    /* Validation */
    if (!id || !title || !author || !price) {
        return res.status(400).json({
            message: "All fields (id, title, author, price) are required"
        });
    }

    /* Duplicate ID Check */
    const exists = books.find(b => b.id === id);
    if (exists) {
        return res.status(400).json({
            message: "Book with this ID already exists"
        });
    }

    const newBook = { id, title, author, price };
    books.push(newBook);

    res.status(201).json({
        message: "Book Added Successfully",
        book: newBook
    });
});

/* ---------- PUT Update Book ---------- */
app.put('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book Not Found"
        });
    }

    Object.assign(book, req.body);

    res.status(200).json({
        message: "Book Updated Successfully",
        book
    });
});

/* ---------- DELETE Book ---------- */
app.delete('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book Not Found"
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Book Deleted Successfully"
    });
});

/* ---------- Server ---------- */
app.listen(3000, () => {
    console.log("📚 Bookstore API running on port 3000");
});
