const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from query params
    const limit = 2; // Set limit to 1 patient per page
    const skip = (page - 1) * limit; // Calculate the number of patients to skip

    const patients = await Patient.find().skip(skip).limit(limit); // Fetch patients
    const totalPatients = await Patient.countDocuments(); // Get the total number of patients

    res.json({
      totalPatients,
      totalPages: Math.ceil(totalPatients / limit), // Calculate total pages
      currentPage: page,
      patients,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a patient by ID

router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' }); // Ensure this line is present
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { name, age, condition, medicalHistory, treatmentPlan } = req.body;

    // Create a new patient instance
    const newPatient = new Patient({
      name,
      age,
      condition,
      medicalHistory,
      treatmentPlan,
    });

    // Save the patient to the database
    await newPatient.save();

    // Send success response
    res.status(201).json({ message: 'Patient details saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving patient details', error });
  }
});

router.post('/get_name', async (req, res) => {
  try {
    const { patientId } = req.body;
    const patient = await Patient.findById(patientId).select('name');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ name: patient.name });
  } catch (error) {
    res.status(500).json({ message: 'Error saving patient details', error });
  }
});

module.exports = router;
