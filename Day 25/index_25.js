
const mongoose = require('mongoose');
const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


async function createProductNameIndex() {
  try {
    await Product.createIndexes({ name: 1 }); 
    console.log('Index created successfully.');
  } catch (error) {
    console.error('Error creating index:', error);
  } finally {
    mongoose.disconnect(); 
  }
}


createProductNameIndex();
