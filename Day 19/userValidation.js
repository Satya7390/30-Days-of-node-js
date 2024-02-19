// Import necessary modules
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

// Define user schema with validation rules
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Email validation regular expression
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

// Create User model from the schema
const User = mongoose.model('User', userSchema);

/**
 * Adds a new user to the MongoDB database with validation
 * @param {Object} user - User object with properties username and email
 */
function addUserWithValidation(user) {
    // Create a new user instance
    const newUser = new User(user);
    
    // Attempt to save the user to the database
    newUser.save()
        .then(savedUser => {
            console.log('User added successfully:', savedUser);
        })
        .catch(err => {
            console.error('Error:', err.message);
        });
}


// Test case: Call addUserWithValidation({ username: 'john_doe', email: 'invalid-email' }) and check for validation error
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
