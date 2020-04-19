const express = require('express')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')))
app.use(routes)
app.use(errors())
 

module.exports = app;
