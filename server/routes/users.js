const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { clerkMiddleware } = require('../middleware/clerk');

// Create/Update user profile from Clerk
router.post('/profile', clerkMiddleware, async (req, res) => {
  try {
    const { clerkId, name, email, age, gender, county } = req.body;

    // Check if user exists
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { clerkId },
        { name, email, age, gender, county },
        { new: true, runValidators: true }
      );
    } else {
      // Create new user
      user = await User.create({
        clerkId,
        name,
        email,
        age,
        gender,
        county
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get user profile
router.get('/profile/:clerkId', clerkMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update user profile
router.put('/profile/:clerkId', clerkMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
