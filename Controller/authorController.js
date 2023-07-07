const bcrypt = require('bcrypt');
const user = require('../Model/authorModel');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const SignUp = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const exist = await user.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: 'This email already exists',
      });
    }

    const signup = new user({
      email,
      name,
      password: hashedPassword,
      bio,
    });

    const authorData = await signup.save();
    return res.status(200).json({
      success: true,
      message: 'User Signup successfully',
      authorData,
    });
  } catch (error) {
    next(error);
  }
};

const LogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const author = await user.findOne({ email });
    if (!author) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, author.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...authorDetails } = author._doc;
      res.json({ token, authorDetails });
    } else {
      return res
        .status(400)
        .send({ message: 'Invalid Credentials', status: 400 });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { SignUp, LogIn };
