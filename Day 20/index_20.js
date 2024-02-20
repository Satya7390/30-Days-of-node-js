const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyanandgupta845:tbyKCQIMxkkvnApU@scaler-db.z7zfsir.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  name: String,
  age: Number,
});

const app = express();

// Express route to calculate the average age of all users
app.get('/average-age', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' },
        },
      },
    ]);

    const averageAge = result[0].averageAge;
    res.json({ averageAge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
