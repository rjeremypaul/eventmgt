const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/eventManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // Check if the user already exists in MongoDB
    const existingUserMongo = await User.findOne({ email });
    if (existingUserMongo) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the user already exists in the CSV file
    const isUserDuplicate = await checkDuplicateUser(email);
    if (isUserDuplicate) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Save the user to MongoDB
    const newUser = new User({ username, email, password, phone });
    await newUser.save();

    // Save the user to the CSV file
    await saveUserToCSV(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Helper function to check if a user already exists in the CSV file
const checkDuplicateUser = async (email) => {
  const csvFilePath = './src/UserAccount.csv';

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.email === email) {
          resolve(true); // User already exists
        }
      })
      .on('end', () => {
        resolve(false); // User does not exist
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Helper function to save a user to the CSV file
const saveUserToCSV = async (user) => {
  const csvFilePath = './src/UserAccount.csv';

  const userCsvData = `${user.username},${user.email},${user.password},${user.phone}\n`;

  fs.appendFileSync(csvFilePath, userCsvData, 'utf8');
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
