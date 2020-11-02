const express = require('express');
const cors = require('cors');
const app = express();
//Rotas
const livroRoute = require('./routes/livroRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use('/api', livroRoute);

module.exports = app;