const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a product
async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Retrieve all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All products:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error);
    return [];
  }
}

// Update a product
async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Delete a product
async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Test cases
async function test() {
  await createProduct({ name: 'Product 1', price: 10, quantity: 5 });
  const products = await getAllProducts();
  if (products.length > 0) {
    const productId = products[0]._id;
    await updateProduct(productId, { price: 15 });
    await deleteProduct(productId);
  }
}

// Run test cases
test();
