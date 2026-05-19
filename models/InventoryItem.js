const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true },
  threshold: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
