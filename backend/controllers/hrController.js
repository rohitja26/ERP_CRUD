const Attendance = require('../models/attendanceModel');
const Salary = require('../models/salaryModel');
const Employee = require('../models/employeeModel');


exports.recordAttendance = async (req, res) => {
     try {
          const { employeeId, status } = req.body;

          const attendance = new Attendance({
               labourId: employeeId,
               date: new Date(),
               status,
          });

          await attendance.save();
          res.status(201).json({ message: 'Attendance recorded successfully', attendance });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not record attendance.' });
     }
};


exports.calculateSalary = async (req, res) => {
     try {
          const { employeeId, month, amount } = req.body;

          const salary = new Salary({
               employeeId,
               month,
               amount,
          });

          await salary.save();
          res.status(201).json({ message: 'Salary calculated and recorded successfully', salary });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not calculate salary.' });
     }
};
