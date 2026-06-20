const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,

  sectionA: Number,
  sectionB: Number,
  sectionC: Number,
  sectionD: Number,
  sectionE: Number,

  totalScore: Number,
  riskCategory: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Patient",
  patientSchema
);