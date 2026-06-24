import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PatientProfile() {

  const { id } = useParams();

  const [patient, setPatient] =
    useState(null);

  useEffect(() => {

    axios
      .get(
        `https://vita-ai-4j8b.onrender.com/api/patients/${id}`
      )
      .then((res) => {
        setPatient(res.data);
      });

  }, [id]);

  if (!patient)
  {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "40px"
      }}
    >

      <h1>
        Patient Profile
      </h1>

      <h3>
        Name:
        {patient.name}
      </h3>

      <h3>
        Age:
        {patient.age}
      </h3>

      <h3>
        Gender:
        {patient.gender}
      </h3>

      <h3>
        Total Score:
        {patient.totalScore}
      </h3>

      <h3>
        Risk:
        {patient.riskCategory}
      </h3>

      <hr />

      <p>
        Section A:
        {patient.sectionA}
      </p>

      <p>
        Section B:
        {patient.sectionB}
      </p>

      <p>
        Section C:
        {patient.sectionC}
      </p>

      <p>
        Section D:
        {patient.sectionD}
      </p>

      <p>
        Section E:
        {patient.sectionE}
      </p>

    </div>
  );
}