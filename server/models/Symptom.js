// models/Symptom.js
const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  bodyPart: {
    type: String,
    enum: ['head', 'chest', 'abdomen', 'limbs', 'skin', 'throat', 'eyes', 'ears', 'general']
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe']
  },
  relatedDiseases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disease'
  }],
  isEmergency: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Symptom', symptomSchema);



