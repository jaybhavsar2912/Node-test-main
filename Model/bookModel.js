const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  price: { type: Number, required: true, min: 0 },
  coverImage: { type: String, required: true },
});
module.exports = mongoose.model('books', bookSchema);
