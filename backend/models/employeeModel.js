const employeeSchema = new mongoose.Schema({
     name: String,
     assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     inTime: Date,
     outTime: Date,
     tasks: [String],
});

module.exports = mongoose.model('Employee', employeeSchema);
