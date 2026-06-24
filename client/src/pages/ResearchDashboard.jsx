import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const navigate = useNavigate();
  const deletePatient = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this patient?"
    );

  if (!confirmDelete)
  {
    return;
  }

  try {

    await axios.delete(
      `https://vita-ai-4j8b.onrender.com/api/patients/${id}`
    );

    setPatients(
      patients.filter(
        (patient) =>
          patient._id !== id
      )
    );

  } catch (error) {

    console.log(error);

  }
};
  

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

  const averageScore =
patients.length > 0
? (
    patients.reduce(
      (sum, p) =>
        sum + (p.totalScore || 0),
      0
    ) / patients.length
  ).toFixed(1)
: 0;
const maleCount =
patients.filter(
  (p) => p.gender === "Male"
).length;

const femaleCount =
patients.filter(
  (p) => p.gender === "Female"
).length;

const genderData = [
  {
    name: "Male",
    value: maleCount
  },
  {
    name: "Female",
    value: femaleCount
  }
];
const ageData = [
  {
    group: "0-20",
    count: patients.filter(
      (p) => p.age <= 20
    ).length
  },
  {
    group: "21-40",
    count: patients.filter(
      (p) =>
        p.age > 20 &&
        p.age <= 40
    ).length
  },
  {
    group: "41+",
    count: patients.filter(
      (p) => p.age > 40
    ).length
  }
];
<div
  style={{
    background: "#dbeafe",
    padding: "20px",
    borderRadius: "12px",
    width: "220px"
  }}
>
  <h2>{averageScore}</h2>
  <p>Average Score</p>
</div>

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
<h2>
  Section-wise Analysis
</h2>

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
  },

  {
    name: "Section D",
    value:
      patients.reduce(
        (sum, p) =>
          sum + (p.sectionD || 0),
        0
      )
  },

  {
    name: "Section E",
    value:
      patients.reduce(
        (sum, p) =>
          sum + (p.sectionE || 0),
        0
      )
  }
];
  const filteredPatients =
  patients.filter((patient) => {

    const matchesName =
      patient.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesRisk =
      riskFilter === "All"
        ? true
        : patient.riskCategory === riskFilter;

    return (
      matchesName &&
      matchesRisk
    );

  });

  return (
  <div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "40px",
      textAlign: "center",
      
      
    }}
  >
      <h1
  style={{
    fontSize: "42px",
    marginBottom: "30px",
    color: "#2563eb"
  }}
>
  VITA-AI Research Dashboard
</h1>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "40px",
    flexWrap: "wrap"
  }}
>

  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      width: "220px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}
  >
    <h2>{patients.length}</h2>
    <p>Total Patients</p>
  </div>

  <div
    style={{
      background: "#dcfce7",
      padding: "20px",
      borderRadius: "12px",
      width: "220px"
    }}
  >
    <h2>{lowRisk}</h2>
    <p>Low Risk</p>
  </div>

  <div
    style={{
      background: "#fef9c3",
      padding: "20px",
      borderRadius: "12px",
      width: "220px"
    }}
  >
    <h2>{moderateRisk}</h2>
    <p>Moderate Risk</p>
  </div>

  <div
    style={{
      background: "#fee2e2",
      padding: "20px",
      borderRadius: "12px",
      width: "220px"
    }}
  >
    <h2>{highRisk}</h2>
    <p>High Risk</p>
  </div>
  <div
  style={{
    background: "#dbeafe",
    padding: "20px",
    borderRadius: "12px",
    width: "220px"
  }}
>
  <h2>{averageScore}</h2>
  <p>Average Score</p>
</div>
  

</div>

      <br />
      <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "40px"
  }}
>
  

  
</div>
    <h2>Risk Analysis</h2>
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
      <h2>Gender Analysis</h2>

<PieChart
  width={500}
  height={350}
>
  <Pie
    data={genderData}
    dataKey="value"
    outerRadius={120}
    label
  >
    <Cell fill="#0f766e" />
    <Cell fill="#ec4899" />
  </Pie>

  <Tooltip />
</PieChart>
<h2>Age Group Analysis</h2>

<BarChart 

  width={700}
  height={350}
  data={ageData}
>
  <CartesianGrid
    strokeDasharray="3 3"
  />

  <XAxis dataKey="group" />

  <YAxis />

  <Tooltip />

  <Bar
    dataKey="count"
    fill="#0f766e"
  />
</BarChart>
<h2>
  Section-wise Analysis
</h2>

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

      <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.1)"
  }}
>
        <br />

<input
  type="text"
  placeholder="Search Patient Name..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  style={{
    padding: "12px",
    width: "350px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
/>

<table border="1"></table>
<select
  value={riskFilter}
  onChange={(e) =>
    setRiskFilter(
      e.target.value
    )
  }
  style={{
    padding: "12px",
    marginLeft: "15px",
    borderRadius: "8px"
  }}
>
  <option value="All">
    All Patients
  </option>

  <option value="Low Risk">
    Low Risk
  </option>

  <option value="Moderate Risk">
    Moderate Risk
  </option>

  <option value="High Risk">
    High Risk
  </option>
</select>

        <thead>

          <tr>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>
  Name
</th>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>Age</th>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>Gender</th>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>Score</th>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>Risk</th>
  <th
  style={{
    background: "#2563eb",
    color: "white",
    padding: "12px"
  }}
>Actions</th>
</tr>

        </thead>

        <tbody>

          {
           filteredPatients.map(
              (patient) => (

                <tr
                  key={patient._id}
                >
                  <td>
                    {patient.name}
                  </td>

                  <td>{patient.age}</td>

<td>{patient.gender}</td>

<td>{patient.totalScore}</td>

<td>
  <span
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      color: "white",
      background:
        patient.riskCategory === "High Risk"
          ? "#ef4444"
          : patient.riskCategory === "Moderate Risk"
          ? "#f59e0b"
          : "#22c55e"
    }}
  >
    {patient.riskCategory}
  </span>
</td>

<td>

  <button
    onClick={() =>
      navigate(
        `/patient/${patient._id}`
      )
    }
    style={{
      background: "#0f766e",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "8px"
    }}
  >
    View
  </button>

  <button
    onClick={() =>
      deletePatient(
        patient._id
      )
    }
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Delete
  </button>

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