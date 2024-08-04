import "./App.css";
import { Home } from "./components/Home";
import { Profiles } from "./components/Profiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Profiles />} />
      </Routes>
    </Router>
  );
}

export default App;
