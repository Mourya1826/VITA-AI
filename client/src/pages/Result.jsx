import { useLocation } from "react-router-dom";

export default function Result() {

  const location = useLocation();

  const {
  patientName,
  age,

  sectionA,
  sectionB,
  sectionC,
  sectionD,
  sectionE,

  totalScore,
  riskCategory
} = location.state || {};

  let recommendations = [];

  if(riskCategory === "Low Risk")
  {
    recommendations = [
      "Maintain a healthy lifestyle",
      "Continue regular sun exposure",
      "Routine follow-up if needed"
    ];
  }
  else if(riskCategory === "Moderate Risk")
  {
    recommendations = [
      "Increase safe sun exposure",
      "Consume Vitamin D rich foods",
      "Monitor symptoms",
      "Consider clinical review"
    ];
  }
  else
  {
    recommendations = [
      "Consult a physician",
      "Evaluate Vitamin D deficiency",
      "Psychological assessment if needed",
      "Close follow-up recommended"
    ];
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px"
      }}
    >

<h2>Patient Information</h2>

<p><strong>Name:</strong> {patientName}</p>
<p><strong>Age:</strong> {age}</p>

<hr />

<h2>Assessment Scores</h2>

<p>Section A: {sectionA}</p>
<p>Section B: {sectionB}</p>
<p>Section C: {sectionC}</p>
<p>Section D: {sectionD}</p>
<p>Section E: {sectionE}</p>

<hr />

<h2>Total Score: {totalScore}</h2>

<h2
  style={{
    color:
      riskCategory === "Low Risk"
        ? "green"
        : riskCategory === "Moderate Risk"
        ? "orange"
        : "red"
  }}
>
  {riskCategory}
</h2>

      <hr />

      <h3>Recommendations</h3>

      <ul
  style={{
    textAlign: "left",
    maxWidth: "500px",
    margin: "auto"
  }}
>
  {recommendations.map(
    (item, index) => (
      <li key={index}>
        {item}
      </li>
    )
  )}
</ul>

    </div>
  );
}