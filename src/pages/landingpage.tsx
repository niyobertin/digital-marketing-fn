import HeroSection from "../components/herosection";
import Navbar from "../components/common/header/navbar";
import Statistics from "./statistics";
import About from "./about";
import ProductSection from "./productsSection";
import Contacts from "./contacts";
import Footer from "../components/common/footer";
const LandingPage:React.FC = () => (
    <div className="">
        <Navbar/>
       <HeroSection/>
       <Statistics/>
       <About/>
       <ProductSection/>
       <Contacts/>
       <Footer/>
    </div>
);

export default LandingPage;