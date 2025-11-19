// models/Disease.js
const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['infectious', 'chronic', 'lifestyle', 'respiratory', 'digestive', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  commonInKenya: {
    type: Boolean,
    default: false
  },
  symptoms: [{
    type: String
  }],
  causes: [{
    type: String
  }],
  prevention: [{
    type: String
  }],
  selfCare: [{
    type: String
  }],
  whenToSeekHelp: [{
    type: String
  }],
  seriousnessLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  redFlags: [{
    type: String
  }],
  estimatedCost: {
    consultation: String,
    treatment: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Disease', diseaseSchema);
