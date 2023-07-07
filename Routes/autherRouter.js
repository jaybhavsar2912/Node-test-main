const express = require('express');
const authorRoute = express.Router();
const UserController = require('../Controller/authorController');

authorRoute.post('/register', UserController.SignUp);
authorRoute.post('/login', UserController.LogIn);

module.exports = authorRoute;
