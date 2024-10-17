const express = require('express');
const Authorization = require('../models/Authorization');
const router = express.Router();

// Submit prior authorization request
router.post('/', async (req, res) => {
  const { patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, procedureCode } = req.body;

  const newAuthorization = new Authorization({
    patientId,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    procedureCode
  });

  try {
    const savedRequest = await newAuthorization.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all authorization requests
router.get('/', async (req, res) => {
  try {
    const requests = await Authorization.find().populate('patientId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/auth_patients', async (req, res) => {
  try {
    const authorization = await Authorization.find();
    res.json(authorization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
