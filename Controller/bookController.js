const Book = require('../Model/bookModel');
const fs = require('fs');

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name bio');
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      'author',
      'name bio'
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    const { title, price } = req.body;

    const newBook = new Book({
      title,
      author: req.userId,
      price,
      coverImage: req.file.path,
    });
    await newBook.save();
    res.status(201).json({ message: 'Book created successfully.', newBook });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const userId = req.userId;
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    if (book.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized User' });
    }
    if (book.coverImage) {
      fs.unlink(book.coverImage, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    return res.json({ message: 'Book deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;
    const userId = req.userId;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }
    if (book.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized User' });
    }
    if (book.coverImage) {
      fs.unlink(book.coverImage, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    book.title = title;
    book.price = price;
    if (req.file) {
      book.coverImage = req.file.path;
    }
    await book.save();
    res.json({ message: 'Book updated successfully.', book });
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook, getAllBook, getBookById, deleteBook, updateBook };
