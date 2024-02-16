// app.js

const express = require('express');
const mongoose = require('mongoose');

function connectToMongoDB() {
  // MongoDB connection string
  const mongoDBUrl = 'mongodb+srv://satyanandgupta:WMFwlOvVsTvkhGZq@cluster0.erie50w.mongodb.net/?retryWrites=true&w=majority'; 

  // Connect to MongoDB
  mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connection successful event
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully!');
  });

  // Connection error event
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
}

// Call the function to establish MongoDB connection
connectToMongoDB();

// Express app
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
