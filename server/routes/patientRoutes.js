const express = require("express");

const router = express.Router();

const {
  createPatient,
  getPatients,
  getPatientById,
  deletePatient
} = require("../controllers/patientController");

router.post("/", createPatient);

router.get("/", getPatients);

router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

module.exports = router;