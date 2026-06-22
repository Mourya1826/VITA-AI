import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

export default function ResearchDashboard() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {

    axios
      .get("https://vita-ai-4j8b.onrender.com/api/patients")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const lowRisk =
    patients.filter(
      (p) => p.riskCategory === "Low Risk"
    ).length;

  const moderateRisk =
    patients.filter(
      (p) => p.riskCategory === "Moderate Risk"
    ).length;

  const highRisk =
    patients.filter(
      (p) => p.riskCategory === "High Risk"
    ).length;

  const pieData = [
    {
      name: "Low Risk",
      value: lowRisk
    },
    {
      name: "Moderate Risk",
      value: moderateRisk
    },
    {
      name: "High Risk",
      value: highRisk
    }
  ];

  const sectionData = [
    {
      name: "Section A",
      value:
        patients.reduce(
          (sum, p) =>
            sum + (p.sectionA || 0),
          0
        )
    },
    {
      name: "Section B",
      value:
        patients.reduce(
          (sum, p) =>
            sum + (p.sectionB || 0),
          0
        )
    },
    {
      name: "Section C",
      value:
        patients.reduce(
          (sum, p) =>
            sum + (p.sectionC || 0),
          0
        )
    }
  ];

  return (
  <div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "40px",
      textAlign: "center",
      
      
    }}
  >
      <h1>
        Research Dashboard
        
      </h1>

      <h2>
        Total Patients:
        {patients.length}
      </h2>

      <h3>
        Low Risk:
        {lowRisk}
      </h3>

      <h3>
        Moderate Risk:
        {moderateRisk}
      </h3>

      <h3>
        High Risk:
        {highRisk}
      </h3>

      <br />
      <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "40px"
  }}
>
  <div>
    <h2>{patients.length}</h2>
    <p>Total Patients</p>
  </div>

  <div>
    <h2>{lowRisk}</h2>
    <p>Low Risk</p>
  </div>

  <div>
    <h2>{moderateRisk}</h2>
    <p>Moderate Risk</p>
  </div>

  <div>
    <h2>{highRisk}</h2>
    <p>High Risk</p>
  </div>
</div>

      <PieChart width={700} height={450}>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={170}
          label
        >
          <Cell fill="#22c55e" />
          <Cell fill="#facc15" />
          <Cell fill="#ef4444" />
        </Pie>

        <Tooltip />
      </PieChart>

      <br />

      <BarChart
        width={1000}
        height={450}
        data={sectionData}
      >
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="value"
          fill="#3b82f6"
        />
      </BarChart>

      <br />

      <table border="1">

        <thead>

          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Score</th>
            <th>Risk</th>
          </tr>

        </thead>

        <tbody>

          {
            patients.map(
              (patient) => (

                <tr
                  key={patient._id}
                >
                  <td>
                    {patient.name}
                  </td>

                  <td>
                    {patient.age}
                  </td>

                  <td>
                    {patient.totalScore}
                  </td>

                  <td>
                    {patient.riskCategory}
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>
  );
}