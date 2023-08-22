const express = require('express');

const app = express();

const choroLivre = 'chora hoje, amanhã a gente tenta';
console.log(choroLivre);

app.use(express.json());

module.exports = app;