const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  treatmentType: String,
  insurancePlan: String,
  dateOfService: Date,
  diagnosisCode: String,
  procedureCode: String,
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Authorization', authorizationSchema);
