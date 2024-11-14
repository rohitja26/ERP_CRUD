const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name: String,
     email: { type: String, unique: true },
     password: String,
     role: { type: String, enum: ['Admin', 'Sales Manager', 'Labour', 'HR'], required: true },
     location: String, // Only applicable to Sales Managers and Labours
});

module.exports = mongoose.model('User', userSchema);
