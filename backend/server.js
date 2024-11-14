const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

mongoose.connect(process.env.MONGO_URI)
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.log(err));

app.listen(3000, () => console.log('Server running on port 3000'));
