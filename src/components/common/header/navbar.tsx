import React, { useState, useEffect } from "react";
import logoImage from '../../../assets/image.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Detect scroll and apply background color to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <div
        className={`fixed flex items-center w-full justify-between pt-5 pb-5 text-white z-50 transition-all duration-300 ${
          isScrolled ? "bg-black opacity-70" : "bg-transparent"
        }`}
      >
        <div className="flex items-center ml-[8%]">
          <img src={logoImage} alt="logo" className="h-6" />
          <span className="text-2xl font-bold">Nzamura</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden mr-[8%]">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex">
          <ul className="flex w-full justify-between items-center gap-12">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contacts">Contact Us</a></li>
          </ul>
        </div>

        <div className="hidden md:block mr-[8%] font-bold border border-[#EDFF81] p-[0.5%] rounded-[20px]">
          <a href="#">Login/Sign up</a>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#233a2f] opacity-90 text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <ul className="mt-8 flex flex-col gap-4 p-4">
          <li><a href="#home" onClick={toggleSidebar}>Home</a></li>
          <li><a href="#about" onClick={toggleSidebar}>About</a></li>
          <li><a href="#products" onClick={toggleSidebar}>Products</a></li>
          <li><a href="#contacts" onClick={toggleSidebar}>Contact Us</a></li>
          <li>
            <a
              href="#"
              className="font-bold border border-[#EDFF81] p-[2%] rounded-[20px]"
            >
              Login/Sign up
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
