import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Assessment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  age: "",
  gender: "",
  vitaminD: "",

  occupation: "",
  sunExposure: "",
  bodyExposure: "",

  fatigue: "",
discomfort: "",
stamina: "",
workDifficulty: "",

anxiety: "",
sadness: "",
motivation: "",


socialInteraction: "",
workAttendance: ""
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const calculateScore = async () => {

  if (!formData.name.trim()) {
    alert("Please enter Patient Name");
    return;
  }

  if (!formData.age) {
    alert("Please enter Age");
    return;
  }

  if (!formData.gender) {
    alert("Please select Gender");
    return;
  }

  const vitaminD = Number(formData.vitaminD);

  
  let score = 0;
  let sectionB = 0;

  if(vitaminD >= 30)
  {
    score = 0;
  }
  else if(vitaminD >= 20)
  {
    score = 2;
  }
  else if(vitaminD >= 10)
  {
    score = 4;
  }
  else
  {
    score = 6;
  }
  if(formData.occupation === "Outdoor")
{
  sectionB += 0;
}
else if(formData.occupation === "Mixed")
{
  sectionB += 1;
}
else if(formData.occupation === "Indoor")
{
  sectionB += 2;
}
if(formData.sunExposure === "30plus")
{
  sectionB += 0;
}
else if(formData.sunExposure === "15to30")
{
  sectionB += 1;
}
else if(formData.sunExposure === "15less")
{
  sectionB += 2;
}
if(formData.bodyExposure === "full")
{
  sectionB += 0;
}
else if(formData.bodyExposure === "partial")
{
  sectionB += 1;
}
else if(formData.bodyExposure === "face")
{
  sectionB += 2;
}
let sectionC = 0;
sectionC =
Number(formData.fatigue || 0) +
Number(formData.discomfort || 0) +
Number(formData.stamina || 0) +
Number(formData.workDifficulty || 0);
let sectionD = 0;

sectionD =
  Number(formData.anxiety || 0) +
  Number(formData.sadness || 0) +
  Number(formData.motivation || 0);



let sectionE = 0;

sectionE =
  Number(formData.socialInteraction || 0) +
  Number(formData.workAttendance || 0);

const totalScore =
  score +
  sectionB +
  sectionC +
  sectionD +
  sectionE;

let riskCategory = "";

if(totalScore <= 9)
{
  riskCategory = "Low Risk";
}
else if(totalScore <= 19)
{
  riskCategory = "Moderate Risk";
}
else
{
  riskCategory = "High Risk";
}
const patientData = {
  name: formData.name,
  age: formData.age,
  gender: formData.gender,

  sectionA: score,
  sectionB: sectionB,
  sectionC: sectionC,
  sectionD: sectionD,
  sectionE: sectionE,

  totalScore: totalScore,
  riskCategory: riskCategory
};

try {

  await axios.post(
    "http://localhost:5000/api/patients",
    patientData
  );

  console.log("Saved Successfully");

  navigate("/result", {
    state: {
      patientName: formData.name,
      age: formData.age,

      sectionA: score,
      sectionB: sectionB,
      sectionC: sectionC,
      sectionD: sectionD,
      sectionE: sectionE,

      totalScore,
      riskCategory
    }
  });

}
catch(err)
{
  console.log(err);
}


};

  return (
  <div className="min-h-screen bg-gray-100 py-10">

    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">

      <h1>Patient Assessment</h1>
      <hr />



      <br />

      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <br /><br />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">
          Select Gender
        </option>

        <option value="Male">
          Male
        </option>

        <option value="Female">
          Female
        </option>
      </select>

      <br /><br />

      <input
        type="number"
        name="vitaminD"
        placeholder="Vitamin D Level"
        value={formData.vitaminD}
        onChange={handleChange}
      />
      <br /><br />

<select
  name="occupation"
  value={formData.occupation}
  onChange={handleChange}
>
  <option value="">
    Select Occupation
  </option>

  <option value="Outdoor">
    Outdoor Worker
  </option>

  <option value="Mixed">
    Mixed Indoor/Outdoor
  </option>

  <option value="Indoor">
    Indoor Worker
  </option>
</select>
  <br /><br />

<select
  name="sunExposure"
  value={formData.sunExposure}
  onChange={handleChange}
>
  <option value="">
    Daily Sun Exposure
  </option>

  <option value="30plus">
    More than 30 Minutes
  </option>

  <option value="15to30">
    15 to 30 Minutes
  </option>

  <option value="15less">
    Less than 15 Minutes
  </option>
</select>

  <br /><br />

<select
  name="bodyExposure"
  value={formData.bodyExposure}
  onChange={handleChange}
>
  <option value="">
    Body Parts Exposed
  </option>

  <option value="full">
    Face + Arms + Legs
  </option>

  <option value="partial">
    Face + Arms
  </option>

  <option value="face">
    Face Only
  </option>
</select>

<br /><br />

<h2>Section C - Quality of Life</h2>

<p>Fatigue interfering with daily activities</p>

<select
  name="fatigue"
  value={formData.fatigue}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>Muscle or bone discomfort affecting routine work</p>

<select
  name="discomfort"
  value={formData.discomfort}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>Reduced physical stamina or endurance</p>

<select
  name="stamina"
  value={formData.stamina}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>Difficulty maintaining usual work or household roles</p>

<select
  name="workDifficulty"
  value={formData.workDifficulty}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />
<h2>Section D - Psychological Parameters</h2>

<p>Feeling anxious, tense, or restless</p>

<select
  name="anxiety"
  value={formData.anxiety}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>Feeling persistently sad or hopeless</p>

<select
  name="sadness"
  value={formData.sadness}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>Loss of interest or motivation in usual activities</p>

<select
  name="motivation"
  value={formData.motivation}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<h2>Section E - Social / Occupational Impact</h2>

<p>
Health concerns affecting social interaction
</p>

<select
  name="socialInteraction"
  value={formData.socialInteraction}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<p>
Health affecting work attendance or efficiency
</p>

<select
  name="workAttendance"
  value={formData.workAttendance}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option value="0">Never</option>
  <option value="1">Sometimes</option>
  <option value="2">Often</option>
</select>

<br /><br />

<button
  onClick={calculateScore}
  className="
    bg-blue-600
    text-white
    px-6
    py-3
    rounded-lg
    hover:bg-blue-700
  "
>
  Calculate Score
</button>

        </div>
  </div>
);
}