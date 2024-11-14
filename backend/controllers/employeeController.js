const User = require('../models/userModel');
exports.viewProfile = async (req, res) => {
     try {

          const employee = await User.findById(req.user._id, 'name email location role');
          if (!employee || employee.role !== 'Employee') {
               return res.status(404).json({ message: 'Employee profile not found.' });
          }

          res.status(200).json({ employee });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not retrieve profile.' });
     }
};

exports.recordDailyStatus = async (req, res) => {
     try {
          const { status, inTime, outTime } = req.body;


          if (req.user.role !== 'Employee') {
               return res.status(403).json({ message: 'Only employees can record daily status.' });
          }


          const employee = await User.findByIdAndUpdate(
               req.user._id,
               { status, inTime, outTime },
               { new: true }
          );

          if (!employee) return res.status(404).json({ message: 'Employee not found.' });

          res.status(200).json({ message: 'Daily status updated successfully', employee });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not record daily status.' });
     }
};

exports.viewAttendance = async (req, res) => {
     try {
          if (req.user.role !== 'Employee' || req.user.role !== 'Hr') {
               return res.status(403).json({ message: 'Only employees and hr can view attendance records.' });
          }


          const employee = await User.findById(req.user._id, 'attendanceRecords');
          if (!employee) return res.status(404).json({ message: 'Attendance records not found.' });

          res.status(200).json({ attendanceRecords: employee.attendanceRecords });
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error. Could not retrieve attendance records.' });
     }
};
