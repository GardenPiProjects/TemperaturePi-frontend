"use strict";
const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const ejs = require('ejs');
const router = require('./scripts/server/routes');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());

router.init(app);