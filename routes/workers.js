const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one worker
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (worker == null) {
      return res.status(404).json({ message: 'Cannot find worker' });
    }
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one worker
router.post('/', async (req, res) => {
  const worker = new Worker({
    name: req.body.name,
    role: req.body.role,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status,
    joinDate: req.body.joinDate,
    tasksAssigned: req.body.tasksAssigned
  });

  try {
    const newWorker = await worker.save();
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one worker
router.put('/:id', async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one worker
router.delete('/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Worker' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
