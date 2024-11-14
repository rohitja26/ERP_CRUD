const salarySchema = new mongoose.Schema({
     employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     month: String,
     amount: Number,
});

module.exports = mongoose.model('Salary', salarySchema);
