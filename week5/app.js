// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/items', itemsRouter);

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/mongoose_crud';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
