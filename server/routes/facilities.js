
// routes/facilities.js
const express = require('express');
const router = express.Router();
const HealthFacility = require('../models/HealthFacility');

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const { county, type, isGovernment, emergencyServices } = req.query;
    let query = {};

    if (county) query.county = { $regex: county, $options: 'i' };
    if (type) query.type = type;
    if (isGovernment) query.isGovernment = isGovernment === 'true';
    if (emergencyServices) query.emergencyServices = emergencyServices === 'true';

    const facilities = await HealthFacility.find(query);
    res.json({ success: true, count: facilities.length, data: facilities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get facility by ID
router.get('/:id', async (req, res) => {
  try {
    const facility = await HealthFacility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: 'Facility not found' });
    }
    res.json({ success: true, data: facility });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create facility (admin)
router.post('/', async (req, res) => {
  try {
    const facility = await HealthFacility.create(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
