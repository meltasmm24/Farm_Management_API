const mongoose = require('mongoose');

const LivestockSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, default: 'Unknown' },
  ageMonths: { type: Number, default: 0 },
  weightKg: { type: Number, required: true },
  healthStatus: { type: String, enum: ['Healthy', 'Sick', 'Pregnant', 'Under Observation'], default: 'Healthy' },
  lastVaccination: { type: String }
});

module.exports = mongoose.model('Livestock', LivestockSchema);
