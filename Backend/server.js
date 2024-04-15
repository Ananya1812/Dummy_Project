const express = require('express');
const mongoose = require("mongoose")
const app = express();
const port = 3000;
require('dotenv').config()
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongodburi = process.env.MONGODB_URI

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Connecting to MongoDB
mongoose.connect(mongodburi)

// Defining a route to check MongoDB status
app.get('/connection', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    console.log("connected")
    res.status(200).json({ message: 'Mongo DB is successfully connected' });
  } else {
    res.status(400).json({ message: 'Error connecting to Mongo DB' });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
