// routes/diseases.js
const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

// Get all diseases
router.get('/', async (req, res) => {
  try {
    const { category, commonInKenya, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (commonInKenya) query.commonInKenya = commonInKenya === 'true';
    if (search) query.name = { $regex: search, $options: 'i' };

    const diseases = await Disease.find(query);
    res.json({ success: true, count: diseases.length, data: diseases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get disease by ID
router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).json({ success: false, message: 'Disease not found' });
    }
    res.json({ success: true, data: disease });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create disease (admin)
router.post('/', async (req, res) => {
  try {
    const disease = await Disease.create(req.body);
    res.status(201).json({ success: true, data: disease });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
