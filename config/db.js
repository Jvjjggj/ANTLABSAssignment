// /config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Jak:Sjakeer201@cluster0.5y48ina.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
