import "./App.css";
import SortingAlgorithmVisuals from "./SortingAlgorithmVisuals";
import LandingPage from "./Landingpage";
import GraphsAlgorithms from "./GraphsAlgorithms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <>
    //   <LandingPage />
    //   <SortingAlgorithmVisuals />
    // </>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sort" element={<SortingAlgorithmVisuals />} />
        <Route path="/graphs" element={<GraphsAlgorithms />} />
      </Routes>
    </Router>
  );
}

export default App;
