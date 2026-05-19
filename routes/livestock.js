const express = require('express');
const router = express.Router();
const Livestock = require('../models/Livestock');

// Get all livestock
router.get('/', async (req, res) => {
  try {
    const livestock = await Livestock.find();
    res.json(livestock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one livestock
router.post('/', async (req, res) => {
  const livestock = new Livestock({
    tagId: req.body.tagId,
    species: req.body.species,
    breed: req.body.breed,
    ageMonths: req.body.ageMonths,
    weightKg: req.body.weightKg,
    healthStatus: req.body.healthStatus,
    lastVaccination: req.body.lastVaccination
  });

  try {
    const newLivestock = await livestock.save();
    res.status(201).json(newLivestock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one livestock
router.put('/:id', async (req, res) => {
  try {
    const updatedLivestock = await Livestock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLivestock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one livestock
router.delete('/:id', async (req, res) => {
  try {
    await Livestock.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Livestock' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
