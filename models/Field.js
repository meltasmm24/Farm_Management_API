const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cropType: { type: String, required: true },
  sizeAcres: { type: Number, default: 0 },
  status: { type: String, enum: ['Healthy', 'Needs Water', 'Harvesting', 'Planning'], default: 'Healthy' },
  soilMoisture: { type: Number, default: 0 },
  expectedYield: { type: Number, default: 0 }
});

module.exports = mongoose.model('Field', FieldSchema);
