const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one inventory item
router.post('/', async (req, res) => {
  const item = new InventoryItem({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    unit: req.body.unit,
    threshold: req.body.threshold
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one inventory item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one inventory item
router.delete('/:id', async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted InventoryItem' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
