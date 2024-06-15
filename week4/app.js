const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Route to respond to GET requests at '/'
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Route to respond to GET requests at '/users'
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  res.json(users);
});

// Route to respond to POST requests at '/users'
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('Name is required');
  } else {
    res.send(`User created: ${name}`);
  }
});

// Route to respond to all other requests with a 404 error
app.use((req, res) => {
  res.status(404).send('Not found');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});