const Employee = require('../models/employeeModel');
const User = require('../models/userModel');

exports.addEmployee = async (req, res) => {
     try {
          const { name, email, location } = req.body;

          // Verify if location matches Sales Manager’s area
          if (req.user.role !== 'Sales Manager' || req.user.location !== location) {
               return res.status(403).json({ message: 'Unauthorized to add employees outside your area.' });
          }

          const newEmployee = new Employee({
               name,
               email,
               assignedManager: req.user._id,
               location,
          });

          await newEmployee.save();
          res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not add employee.' });
     }
};

exports.updateEmployee = async (req, res) => {
     try {
          const { id } = req.params;
          const updates = req.body;

          const updatedEmployee = await Employee.findOneAndUpdate(
               { _id: id, assignedManager: req.user._id },
               updates,
               { new: true }
          );

          if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found or not authorized to update.' });

          res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not update employee.' });
     }
};


exports.trackEmployeeTime = async (req, res) => {
     try {
          const { employeeId, inTime, outTime } = req.body;

          const employee = await Employee.findOneAndUpdate(
               { _id: employeeId, assignedManager: req.user._id },
               { inTime, outTime },
               { new: true }
          );

          if (!employee) return res.status(404).json({ message: 'Employee not found or not authorized to update time.' });

          res.status(200).json({ message: 'Employee time tracked successfully', employee });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not track time.' });
     }
};
