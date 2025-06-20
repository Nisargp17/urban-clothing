import "./App.css";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";
import Comp4 from "./components/Comp4";
import Comp5 from "./components/Comp5";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Shoes from "./components/shoes";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <Comp2 />
      <Comp3 />
      <Comp4 />
      <Shoes />
      <Comp5 />
    </>
  );
}

export default App;
