const express = require('express');
const router = express.Router();
const BookController = require("../controllers/bookControllers");


//post request to /books to create a new book
router.post('/books', BookController.createNewBook)

//get request to /books to fetch all books
router.get('/books', BookController.fetchBooks)

//get request to /books/id to fetch single book
router.get('/books', BookController.fetchSingleBook)

//put request to /books/id to update a single book
router.put('/books', BookController.updateSingleBook)

//delete request to /books/id to delete
router.delete('/books', BookController.deleteSingleBook)


module.exports = router;