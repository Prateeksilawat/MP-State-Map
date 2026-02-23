import { useState } from "react";
import './App.css'
import LandingPage from './components/LandingPage'
import Sidebar from "./components/Sidebar";
import MPMap from "./components/MPMap";

function App() {
const [selectedYear, setSelectedYear] = useState(null);

  return (
    // <LandingPage />
    <div style={{ display: "flex" }}>
      <Sidebar
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <MPMap selectedYear={selectedYear} />
    </div>

  )
}

export default App
