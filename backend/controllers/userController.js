const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
     const { name, email, password, role } = req.body;

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const user = new User({ name, email, password: hashedPassword, role });
     await user.save();
     res.send({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return res.status(400).send('Invalid email or password.');

     const validPassword = await bcrypt.compare(password, user.password);
     if (!validPassword) return res.status(400).send('Invalid email or password.');

     const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
     res.send({ token });
};
