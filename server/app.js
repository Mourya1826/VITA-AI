const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VITA-AI Backend Running");
});

app.use("/api/patients", patientRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected");

    app.listen(
      process.env.PORT || 5000,
      () => {
        console.log("Server Running");
      }
    );

  })
  .catch((err) => {
    console.log(err);
  });