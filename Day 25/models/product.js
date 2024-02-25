// models/product.js
const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
  name: String,
  // other fields...
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
