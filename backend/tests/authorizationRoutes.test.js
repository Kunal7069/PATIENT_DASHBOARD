// tests/authorizationRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Authorization = require('../models/Authorization');
const authorizationRoutes = require('../routes/authRoutes'); // Adjust path as needed

const app = express();
app.use(express.json());
app.use('/api/authorizations', authorizationRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await Authorization.deleteMany(); // Clear the test data
  await mongoose.connection.close();
});

describe('Authorization API Routes', () => {
  it('should create a new authorization request', async () => {
    const newAuthRequest = {
      patientId: new mongoose.Types.ObjectId(), // Assuming this ID exists
      treatmentType: 'Physical Therapy',
      insurancePlan: 'Health Plan A',
      dateOfService: new Date(),
      diagnosisCode: 'M54.5',
      procedureCode: '97110',
    };

    const response = await request(app)
      .post('/api/authorizations')
      .send(newAuthRequest);

    expect(response.status).toBe(201);
    expect(response.body.treatmentType).toBe(newAuthRequest.treatmentType);
  });

  it('should fetch all authorization requests', async () => {
    const response = await request(app).get('/api/authorizations');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
