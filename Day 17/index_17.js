// Import required modules
const mongoose = require('mongoose');
 const index_17 = require('express')();
const http = require('http').Server(index_17);

http.listen(3000, function(){
    console.log('Server is running');
});


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: { type: Number } 
});


const User = mongoose.model('User', userSchema);

//  Connect to MongoDB Database
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

//  Test the addUserToDatabase Function
addUserToDatabase({ username: 'rahul', email: 'rahul@example.com',  age:'29' });
addUserToDatabase({ username: 'raman', email: 'raman@example.com',  age:'23' });


