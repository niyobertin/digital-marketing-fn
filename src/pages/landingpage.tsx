import HeroSection from "../components/herosection";
import Navbar from "../components/common/header/navbar";
import Statistics from "./statistics";
import About from "./about";
import ProductSection from "./productsSection";
const LandingPage:React.FC = () => (
    <div className="">
        <Navbar/>
       <HeroSection/>
       <Statistics/>
       <About/>
       <ProductSection/>
    </div>
);

export default LandingPage;