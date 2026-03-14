const express = require('express');
const { db, Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());