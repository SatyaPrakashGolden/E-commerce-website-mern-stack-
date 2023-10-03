const mongoose = require('mongoose');
const url = process.env.URL;
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;