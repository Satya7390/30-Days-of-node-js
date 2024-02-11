const express = require('express');
const bodyParser = require('body-parser');
const authenticationMiddleware = require('./authenticationMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express Authentication Example');
});

app.get('/secured-route', authenticationMiddleware, (req, res) => {
  res.send('This is a secured route.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
