const Patient = require("../models/patient");

exports.createPatient = async (req, res) => {
  try {

    const patient =
      await Patient.create(req.body);

    res.status(201).json(patient);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getPatients = async (req, res) => {
  try {

    const patients =
      await Patient.find();

    res.json(patients);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};