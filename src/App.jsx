import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/results";

function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Home />}/>
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;