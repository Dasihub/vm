require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { handle } = require('i18next-http-middleware');
const { i18next } = require('./modules/i18n');

const app = express();

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(handle(i18next));
app.use(cors({ origin: '*' }));

app.use('/api', require('./routes/index'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public/index.html')));

module.exports = app;
