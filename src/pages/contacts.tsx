import React from "react";
import contactImage from '../assets/imagescontact.png'
const Contacts:React.FC = () =>{
    return(
        <>
        <h1 className="text-[#25FD54] font-bold text-5xl text-center pb-[2%]">Contact us </h1>
        <div className="sm:flex block gap-8">
        <div className="sm:ml-[8%] mr-[2%] w-[80%] sm:block hidden">
                <img src={contactImage} alt="contacts" className="h-[50vh] rounded-[20px]" />
            </div>
        <div className="bg-[#233a2f] text-white pt-[4%] pb-[2%] pb-[4%] mb-[4%] sm:mr-[8%] mr-[2%] w-full text-white text-lg rounded-[30px]" id="contacts">
            <div>     
            <div className="sm:ml-[2%] ml-[2%] sm:mr-[2%] mr-[2%]">
            <div className="mt-2">
                   <input type="text" placeholder="Name" className="bg-[#233a2f] border-b-2 border-green-500 w-full focus:outline-none focus:border-transparen"/>
                </div>
                <div className="mt-2">
                   <input type="email" placeholder="Email" className="bg-[#233a2f] border-b-2 border-green-500 w-full focus:outline-none focus:border-transparen"/>
                </div>
                <div className="mt-2">
                   <input type="tel" placeholder="Phone number" className="bg-[#233a2f] border-b-2 border-green-500 w-full focus:outline-none focus:border-transparen"/> 
                </div>
                <div className="mt-2">
                   <textarea name="message" placeholder="Message" id="" className="bg-[#233a2f] border-b-2 border-green-500 w-full focus:outline-none focus:border-transparen"></textarea> 
                </div>
                <div className="flex items-center justify-center animate-slidein opacity-0 [--slidein-delay:900ms] ">
            <button className="p-[1%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold sm:mt-[6%] mt-[17%] rounded-[30px] px-8">Send</button>
           </div>
            </div>
            </div>
        </div>
            
        </div>
        </>
    )
}

export default Contacts;