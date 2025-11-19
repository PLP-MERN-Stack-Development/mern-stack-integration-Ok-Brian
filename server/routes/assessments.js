// routes/assessments.js
const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const Symptom = require('../models/Symptom');
const Disease = require('../models/Disease');

// Create symptom assessment
router.post('/', async (req, res) => {
  try {
    const { symptoms, additionalInfo, userId } = req.body;

    // Get symptom details
    const symptomDetails = await Symptom.find({
      _id: { $in: symptoms.map(s => s.symptom) }
    }).populate('relatedDiseases');

    // Check for emergency symptoms
    const hasEmergency = symptomDetails.some(s => s.isEmergency);
    
    // Collect all possible diseases
    const diseaseIds = new Set();
    symptomDetails.forEach(symptom => {
      symptom.relatedDiseases.forEach(disease => {
        diseaseIds.add(disease._id.toString());
      });
    });

    // Get disease details
    const possibleDiseases = await Disease.find({
      _id: { $in: Array.from(diseaseIds) }
    });

    // Calculate risk level
    let riskLevel = 'low';
    if (hasEmergency) {
      riskLevel = 'emergency';
    } else if (symptoms.some(s => s.severity === 'severe')) {
      riskLevel = 'high';
    } else if (symptoms.length > 3 || symptoms.some(s => s.severity === 'moderate')) {
      riskLevel = 'medium';
    }

    // Generate recommendations
    const recommendations = [];
    if (riskLevel === 'emergency') {
      recommendations.push('Seek immediate medical attention at the nearest hospital');
      recommendations.push('Call emergency services if symptoms worsen');
    } else if (riskLevel === 'high') {
      recommendations.push('Visit a healthcare facility within 24 hours');
      recommendations.push('Monitor symptoms closely');
    } else if (riskLevel === 'medium') {
      recommendations.push('Consider visiting a clinic if symptoms persist for more than 2-3 days');
      recommendations.push('Rest and stay hydrated');
    } else {
      recommendations.push('Monitor symptoms for any changes');
      recommendations.push('Try home remedies and self-care');
      recommendations.push('Visit a pharmacy for over-the-counter medication if needed');
    }

    // Create assessment
    const assessment = await Assessment.create({
      user: userId || null,
      isAnonymous: !userId,
      symptoms,
      additionalInfo,
      possibleConditions: possibleDiseases.map(d => ({
        disease: d._id,
        confidence: 70 // Simple confidence score
      })),
      riskLevel,
      recommendations,
      needsProfessionalCare: riskLevel === 'high' || riskLevel === 'emergency'
    });

    const populatedAssessment = await Assessment.findById(assessment._id)
      .populate('symptoms.symptom')
      .populate('possibleConditions.disease');

    res.status(201).json({
      success: true,
      data: populatedAssessment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's assessment history
router.get('/history/:userId', async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.params.userId })
      .populate('symptoms.symptom')
      .populate('possibleConditions.disease')
      .sort('-createdAt');
    
    res.json({ success: true, count: assessments.length, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;