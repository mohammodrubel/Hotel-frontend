import Navbar from "./components/Navigation";
import "./App.css";
import { Button } from "antd";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Subscription from "./components/Subscription";

function App() {
  return (
    <>
      <Navbar/>
      <Banner/>
      <Subscription/>
      <Footer/>
    </>
  );
}

export default App;
