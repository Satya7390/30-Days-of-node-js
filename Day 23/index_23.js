const mongoose = require('mongoose');
const Product = require('./models/product');
const Category = require('./models/category');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Test the function
(async () => {
  // Create some categories
  const category1 = await Category.create({ name: 'Electronics', description: 'Electronic devices' });
  const category2 = await Category.create({ name: 'Clothing', description: 'Clothing items' });

  // Create some products with associated categories
  await Product.create({ name: 'Laptop', description: 'Powerful laptop', price: 1000, category: category1._id });
  await Product.create({ name: 'T-Shirt', description: 'Cotton T-Shirt', price: 20, category: category2._id });

  // Retrieve products with populated category details
  const products = await getProductsPopulatedWithCategory();
  console.log('Products with populated category:', products);
})();

