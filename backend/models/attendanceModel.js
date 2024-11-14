const attendanceSchema = new mongoose.Schema({
     labourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Labour' },
     date: Date,
     status: String, // Present, Absent, etc.
});

module.exports = mongoose.model('Attendance', attendanceSchema);
