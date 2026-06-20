import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import ResearchDashboard
from "./pages/ResearchDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/result"
          element={<Result />}
        />
        <Route
  path="/dashboard"
  element={<ResearchDashboard />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;