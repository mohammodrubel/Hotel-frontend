import Navbar from "./components/Navigation";
import "./App.css";
import { Button } from "antd";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Subscription from "./components/Subscription";
import HotelSlider from "./components/Hotel";
import HomePageRoom from "./components/HomePageRoom";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <HotelSlider />
      <HomePageRoom/>
      <Subscription />
      <Footer />
    </>
  );
}

export default App;
