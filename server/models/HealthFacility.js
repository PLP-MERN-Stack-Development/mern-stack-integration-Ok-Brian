// models/HealthFacility.js
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['hospital', 'clinic', 'dispensary', 'health_center', 'pharmacy'],
    required: true
  },
  county: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  services: [{
    type: String
  }],
  contactNumber: {
    type: String
  },
  isGovernment: {
    type: Boolean,
    default: false
  },
  isAffordable: {
    type: Boolean,
    default: true
  },
  operatingHours: {
    weekdays: String,
    weekends: String
  },
  emergencyServices: {
    type: Boolean,
    default: false
  },
  averageCost: {
    consultation: String,
    emergency: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HealthFacility', facilitySchema);