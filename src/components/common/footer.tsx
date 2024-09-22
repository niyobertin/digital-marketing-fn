import React from "react";
import heroImage from '../../assets/hero.jpg';
import logoImage from '../../assets/image.png';
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { FaRegCopyright } from "react-icons/fa6";
const Footer:React.FC = () => {
    return(
        <div>
        <div className="relative w-full h-[30rem] bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
           <div className="absolute inset-0 bg-black opacity-10 "></div> 
           <div className="sm:flex block gap-[10%] justify-between text-white w-full pt-[3%]">
            <div className="sm:ml-[8%] ml-[2%] sm:w-[30%] w-full">
                <div className="flex items-center">
                <img src={logoImage} alt="logo" className="h-6" />
                <span className="text-2xl font-bold text-[#25FD54]">Nzamura</span>
                </div>
                <div className="text-xl pt-[10%]">
                    <p>
                    Nzamura is a company that focus on developing company’s strategy for increase digital marketing
                    </p>
                </div>
                <div className="sm:flex hidden gap-3 pt-5">
                    <TiSocialFacebookCircular size={30}/>
                    <FaSquareXTwitter size={30}/>
                    <TiSocialLinkedinCircular size={30}/>
                    <TiSocialInstagram size={30}/>
                </div>
            </div>
            <div className="w-[30%] ml-[2%]">
                <h1><span className="text-2xl font-bold text-[#25FD54]">Menu</span></h1>
                <div>
                    <ul className="text-xl pt-[10%]">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#contacts">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="sm:mr-[8%] mr-[2%] w-[30%] sm:block hidden">
                <h1><span className="text-2xl font-bold text-[#25FD54]">Company</span></h1>
                <div>
                    <ul className="text-xl pt-[10%]">
                        <li><a href="#">Site Map</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Notice</a></li>
                        <li><a href="#">Modern Slavery </a></li>
                    </ul>
                </div>
            </div>
           </div>
           <div className="bg-[#25FD54] p-[1px] mt-[4%] sm:ml-[8%] ml-[2%] sm:mr-[8%] mr-[2%]"></div>
           <div className="flex justify-center items-center gap-1 pt-[2%] text-white sm:text-lg text-sm"><span><FaRegCopyright /></span> Copyright Nzamura. All right reserved <span>{new Date().getFullYear()}</span></div>
        </div>   
        
    </div>
    )
}
export default Footer;