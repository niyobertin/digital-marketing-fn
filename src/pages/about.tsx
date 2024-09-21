import React, { useEffect, useState } from "react";

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
        <div className="bg-[#233a2f]" id="about">
            <div className="pt-[1%] pb-[4%] sm:ml-[8%] ml-[2%] sm:mr-[8%] mr-[2%] text-white text-lg">
                <h1 className="text-[#25FD54] font-bold text-5xl text-center pb-[2%]">About</h1>
                <p className={`text-center topacity-0 transition-opacity duration-700 ${isVisible ? "animate-slideInLeft opacity-100" : ""} [--slidein-delay:700ms]`}>
                    Welcome to Nzamura!<br />
                    At Nzamura, we believe that businesses deserve to succeed in the digital age. That's why we specialize in creating customized digital marketing strategies that help our clients unlock the full potential of the online world.<br />
                    With a team of expert marketers, designers, and developers, we offer a wide range of digital marketing services, including SEO, PPC, social media marketing, content marketing, branding, product photography, web development, and UX/UI design. No matter your business needs or goals, we have the skills and experience to create a solution that works for you.<br />
                    Our mission is simple: to help businesses thrive in the digital world. We believe that the key to success lies in a deep understanding of your target audience and a comprehensive strategy that leverages the latest digital marketing trends and techniques.<br />
                    At Nzamura, we take pride in our commitment to delivering exceptional results and outstanding customer service. We believe in building strong, long-term relationships with our clients, and we work closely with you every step of the way to ensure that your digital marketing strategy is tailored to your unique needs and goals.<br />
                    Our team is made up of passionate and talented individuals who are dedicated to helping your business succeed. We stay up-to-date on the latest digital marketing trends and techniques, and we're always looking for new and innovative ways to help our clients stay ahead of the competition.<br />
                    If you're ready to take your business to the next level, we're here to help. Contact us today to learn more about our digital marketing services and how we can help you achieve your business goals.
                </p>
            </div>
        </div>
    );
}

export default About;
