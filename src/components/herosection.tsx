import React from "react";
import heroImage from '../assets/hero.jpg'
const HeroSection:React.FC =() =>{
    return(
        <div className="relative w-full h-screen flex  bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
           <div className="absolute inset-0 bg-black opacity-10 "></div> 
           <div className="text-white">
           <h1 className="sm:text-5xl text-xl sm:mt-[14%] mt-[30%] text-center pb-[4%] font-bold animate-slidein opacity-0 [--slidein-delay:300ms]">Unlock The Power Of your business</h1>
           <div className="text-center text-[#FFFFFF] sm:text-xl text-lg sm:mr-[30%] mr-[3%] sm:ml-[30%] ml-[3%] animate-slidein opacity-0 [--slidein-delay:600ms]">
            <p className="">
            Ready to take your business to the next level? Our digital marketing services can help. From boosting your search engine visibility to creating compelling social media campaigns, we have the tools and expertise to help you grow your online presence and connect with more customers than ever before.
            </p>
           </div>
           <div className="flex items-center justify-center animate-slidein opacity-0 [--slidein-delay:900ms]">
            <button className="p-[1%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold sm:mt-[6%] mt-[17%] rounded-[30px] px-8">Get Started</button>
           </div>
           </div>
        </div>
    )
}

export default HeroSection;