const express = require('express');
const router = express.Router();
const Field = require('../models/Field');

// Get all fields
router.get('/', async (req, res) => {
  try {
    const fields = await Field.find();
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one field
router.post('/', async (req, res) => {
  const field = new Field({
    name: req.body.name,
    cropType: req.body.cropType,
    sizeAcres: req.body.sizeAcres,
    status: req.body.status,
    soilMoisture: req.body.soilMoisture,
    expectedYield: req.body.expectedYield
  });

  try {
    const newField = await field.save();
    res.status(201).json(newField);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one field
router.put('/:id', async (req, res) => {
  try {
    const updatedField = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedField);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one field
router.delete('/:id', async (req, res) => {
  try {
    await Field.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Field' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
