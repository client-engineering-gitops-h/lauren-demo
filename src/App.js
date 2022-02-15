import React from "react";
import "./styles/DigitalMesh.css";
import Dashboard from "./components/Dashboard";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="DigitalMesh">
      <Topbar />
      <Dashboard />
    </div>
  );
}

export default App;
