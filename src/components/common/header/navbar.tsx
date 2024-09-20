import React from "react";
import logoImage from '../../../assets/image.png'
const Navbar:React.FC = () => {
    return(
        <>
        <div className="fixed flex items-center w-full  justify-between pt-5 pb-5 text-white z-50">
            <div className="flex items-center ml-[8%]"><img src={logoImage} alt="logo" className="h-6"/><span className="text-2xl font-bold">Nzamura</span></div>
            <div>
                <ul className="flex w-full justify-between items-center gap-12">
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Products</a></li>
                    <li><a href="">Contact us</a></li>
                </ul>
            </div>
            <div className="mr-[8%] font-bold border border-[#EDFF81] p-[0.5%] rounded-[20px]">
                <a href="">Login/Sign up</a>
            </div>
        </div>
        </>
    )
};

export default Navbar;