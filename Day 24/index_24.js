// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Route to create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to retrieve all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
