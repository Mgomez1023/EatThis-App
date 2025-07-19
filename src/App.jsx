import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/results";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/Profile/:placeId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;