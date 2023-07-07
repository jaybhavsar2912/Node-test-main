const express = require('express');
require('dotenv').config();
const cors = require('cors');
const ConnectDB = require('./db/_con');

const authorRouter = require('./Routes/autherRouter');
const bookRouter = require('./Routes/bookRouter');
const { errorHandler } = require('./Middleware/errorHandler');

const app = express();
const port = process.env.PORT;

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/auth', authorRouter);
app.use('/', bookRouter);
app.use(errorHandler);

app.use((req, res, next) => {
  console.log('HTTP Method - ' + req.method + ',URL - ' + req.url);
  next();
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
