const express = require('express');
const router = express.Router();
const BookController = require("../controllers/bookControllers");
const {authenticateUser, checkIfAdmin} = require('../middlewares/authentication')

//post request to /books to create a new book
router.post('/books', authenticateUser,checkIfAdmin, BookController.createNewBook)

//get request to /books to fetch all books
router.get('/books', authenticateUser, BookController.fetchBooks)

//get request to /books/id to fetch single book
router.get('/books', authenticateUser, BookController.fetchSingleBook)

//put request to /books/id to update a single book
router.put('/books', authenticateUser, BookController.updateSingleBook)

//delete request to /books/id to delete
router.delete('/books', authenticateUser, BookController.deleteSingleBook)


module.exports = router;