const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, default: 'N/A' },
  email: { type: String, default: 'N/A' },
  status: { type: String, enum: ['Active', 'On Leave', 'Sick'], default: 'Active' },
  joinDate: { type: String },
  tasksAssigned: { type: Number, default: 0 }
});

module.exports = mongoose.model('Worker', WorkerSchema);
