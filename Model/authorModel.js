const mongoose = require('mongoose');

const authorScema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, 'please enter a email'],
    unique: [true, 'email already exist'],
  },
  password: {
    type: String,
    required: true,
    minimum: [8, 'password must be atlease 8 digits'],
  },
  bio: { type: String, required: true },
});

module.exports = mongoose.model('author', authorScema);
