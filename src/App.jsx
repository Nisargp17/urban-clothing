// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // for github
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import GooeyCursor from "./components/GooeyCursor";
import COLLECTIONS from "./components/COLLECTIONS";
import Shop from "./components/Shop";

function App() {
  return (
    <Router>
      <NavBar />
      <GooeyCursor />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/COLLECTIONS" element={<COLLECTIONS />} />
      </Routes>
    </Router>
  );
}

export default App;
