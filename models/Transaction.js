const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
