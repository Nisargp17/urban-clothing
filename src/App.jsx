import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import GooeyCursor from "./components/GooeyCursor";
import ClothedCollection from "./components/ClothesCollection";

function App() {
  return (
    <>
      <NavBar />
      <GooeyCursor />
      {/* <HomePage /> */}
      <ClothedCollection />
      {/* <Footer /> */}
    </>
  );
}

export default App;
