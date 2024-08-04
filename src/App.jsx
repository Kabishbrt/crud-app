import "./App.css";
import { Edit } from "./components/Edit";
import { Home } from "./components/Home";
import { Profiles } from "./components/Profiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/edit/:index" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
