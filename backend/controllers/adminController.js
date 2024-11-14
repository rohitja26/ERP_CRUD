const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.addSalesManager = async (req, res) => {
     try {
          const { name, email, password, location } = req.body;

          // Validate request data
          if (!name || !email || !password || !location) {
               return res.status(400).json({ message: 'All fields are required.' });
          }

          // Check if user with this email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return res.status(400).json({ message: 'A user with this email already exists.' });
          }

          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Create a new Sales Manager user
          const salesManager = new User({
               name,
               email,
               password: hashedPassword,
               role: 'Sales Manager',
               location,
          });

          // Save the Sales Manager in the database
          await salesManager.save();

          res.status(201).json({ message: 'Sales Manager added successfully', salesManager });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
     }
};


exports.viewLocations = async (req, res) => {
     const managers = await User.find({ role: 'Sales Manager' }, 'location');
     const employee = await User.find({ role: 'Employee' }, 'location');
     res.send({ managers, employee });
};

exports.getUserLists = async (req, res) => {
     try {
          // Fetch Sales Managers
          const salesManagers = await User.find({ role: 'Sales Manager' }, 'name email location');

          // Fetch HR personnel
          const hrList = await User.find({ role: 'HR' }, 'name email');

          // Fetch Employees (Labours)
          const employees = await User.find({ role: 'Employee' }, 'name email assignedManager inTime outTime');

          res.status(200).json({
               salesManagers,
               hrList,
               employees,
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not fetch user lists.' });
     }
};
