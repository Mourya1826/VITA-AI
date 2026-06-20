const express = require("express");

const router = express.Router();

const {
  createPatient,
  getPatients
} = require("../controllers/patientcontroller");

router.post("/", createPatient);

router.get("/", getPatients);

module.exports = router;