import React, { useEffect, useState } from "react";
import AboutImage from '../assets/bussiness grow.jpg';

const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                const { top } = aboutSection.getBoundingClientRect();
                if (top < window.innerHeight && top > 0) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="" id="about">
          <h1 className="text-[#25FD54] font-bold text-5xl text-center pb-[2%]">About</h1>
          <div className="sm:flex block justify-between items-center pt-[1%] pb-[4%] sm:text-medium  text-white w-full">
                <div className="sm:w-[45%] w-full rounded-[20px] flex items-center justify-center overflow-hidden">
                    <img src={AboutImage} alt="about" className="object-cover w-full h-auto" />
                </div>

                <div className="sm:w-[45%] w-full bg-[#1d3126] sm:mr-[4%] mr-[2%] p-[2%] rounded-[20px]">
                    <p className='text-center mr-[2%]  w-full'>
                        <b className="text-lg">Welcome to Nzamura!</b><br />
                        At Nzamura, we believe that businesses deserve to succeed in the digital age. That's why we specialize in creating customized digital marketing strategies that help our clients unlock the full potential of the online world.<br /><br/>
                        <b >Our mission is simple:</b><br/>
                         To help businesses thrive in the digital world. We believe that the key to success lies in a deep understanding of your target audience and a comprehensive strategy that leverages the latest digital marketing trends and techniques.<br />
                        At Nzamura, we take pride in our commitment to delivering exceptional results and outstanding customer service. We believe in building strong, long-term relationships with our clients, and we work closely with you every step of the way to ensure that your digital marketing 
                        strategy is tailored to your unique needs and goals.<br />
                        If you're ready to take your business to the next level, we're here to help.
                         Contact us today to learn more about our digital marketing services and how we can help you achieve your business goals.
                    </p>
                </div>
            </div>  
        </div>
    );
}

export default About;
