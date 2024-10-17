// tests/patientRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const patientRoutes = require('../routes/patientRoutes'); // Adjust path as needed

const app = express();
app.use(express.json());
app.use('/api/patients', patientRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await Patient.deleteMany(); // Clear the test data
  await mongoose.connection.close();
});

describe('Patient API Routes', () => {
  it('should create a new patient', async () => {
    const newPatient = {
      name: 'John Doe',
      age: 30,
      condition: 'Flu',
      medicalHistory: 'None',
      treatmentPlan: 'Rest',
    };

    const response = await request(app)
      .post('/api/patients')
      .send(newPatient);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Patient details saved successfully!');
  });

  it('should fetch all patients', async () => {
    const response = await request(app).get('/api/patients?page=1');
    expect(response.status).toBe(200);
    expect(response.body.patients).toBeInstanceOf(Array);
  });

  it('should get a patient by ID', async () => {
    const patient = await Patient.findOne();
    const response = await request(app).get(`/api/patients/${patient._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(patient.name);
  });

  it('should return a 404 for a non-existent patient', async () => {
    const response = await request(app).get('/api/patients/60d0fe4f5311236168a109c8'); // non-existent ID
    expect(response.status).toBe(404);
  });
});
