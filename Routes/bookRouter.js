const express = require('express');
const bookRouter = express.Router();
const bookController = require('../Controller/bookController');
const { verifyToken, isAuthenticated } = require('../Middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

bookRouter.post(
  '/books',
  isAuthenticated,
  upload.single('coverImage'),
  bookController.addBook
);
bookRouter.get('/books', isAuthenticated, bookController.getAllBook);
bookRouter.get('/books/:id', isAuthenticated, bookController.getBookById);
bookRouter.delete('/books/:id', isAuthenticated, bookController.deleteBook);
bookRouter.put(
  '/books/:id',
  isAuthenticated,
  upload.single('coverImage'),
  bookController.updateBook
);

module.exports = bookRouter;
