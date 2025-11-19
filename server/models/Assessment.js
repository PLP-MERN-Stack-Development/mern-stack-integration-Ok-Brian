// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  symptoms: [{
    symptom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Symptom'
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    }
  }],
  additionalInfo: {
    duration: String,
    age: Number,
    gender: String,
    county: String
  },
  possibleConditions: [{
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disease'
    },
    confidence: Number
  }],
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    required: true
  },
  recommendations: [{
    type: String
  }],
  needsProfessionalCare: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },//this is the last code i added here, could be the problem
  clerkUserId:{type: String, index: true}
});

module.exports = mongoose.model('Assessment', assessmentSchema);