import React, { useState, useEffect } from "react";
import logoImage from '../../../assets/image.png';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { IoIosClock } from "react-icons/io";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const loggedIn: any = localStorage.getItem('accessToken');
  const loggedInUserString:any = localStorage.getItem('loggedin_user');
  let loggedInUser;

if (typeof loggedInUserString === 'string') {
    try {
        loggedInUser = JSON.parse(loggedInUserString);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
    }
} else {
    loggedInUser = loggedInUserString; 
}

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedin_user');
    window.location.href = '/';  
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
  const [currentTime, setCurrentTime] = useState<string>('');
  const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
      updateTime(); 
      const intervalId = setInterval(updateTime, 1000);
      return () => clearInterval(intervalId); 
  }, []);

  return (
    <>
      {/* Header */}
      <div
        className={`fixed flex items-center w-full justify-between pt-5 pb-5 text-white z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#1d3126]" : "bg-transparent"
        }`}
      >
         {/* Hamburger Menu for Mobile */}
         <div className="md:hidden ml-[8%]">
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
        <div className="flex items-center sm:ml-[8%] ml-0">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="logo" className="h-6" />
            <span className="text-2xl font-bold">NZAMURA</span>
          </Link>
          <p className='flex items-center sm:text-normal text-sm gap-1 font-bold ml-2'><span className="sm:block hidden"><IoIosClock size={25} /></span> {currentTime}</p>  
        </div>
        {!loggedIn ? (
                 <div className="relative mr-[8%] sm:hidden block">
                 <span onClick={toggleDropdown} className="flex gap-2 items-center cursor-pointer">
                   <FaRegUser size={30} className="bg-gray-200 p-1 rounded-full text-black" />
                 </span>
                 {isDropdownOpen && (
                   <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg py-2 z-50">
                      <p className="block px-4 py-2">
                     <Link to="/login">
                       Login
                    </Link>
                     </p>
                     <p className="block px-4 py-2">
                     <Link to="/register">
                       Sign up
                    </Link>
                     </p>
                   </div>
                 )}
               </div>
              ) : ""}
        {/* Links for Desktop */}
        <div className="hidden md:flex">
          <ul className="flex w-full justify-between items-center gap-12">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contacts">Contact Us</a></li>
          </ul>
        </div>

        {!loggedIn ? (
        <div className="sm:flex md:flex hidden justify-between gap-4 items-center mr-[8%] font-bold">
          <Link to="/login">
            <button className="p-[2%] pb-[2%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold rounded-[30px] px-8">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="p-[2%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold rounded-[30px] px-8 flex items-center">
              SignUp
            </button>
          </Link>
        </div>
      ) : (
        <div className="relative mr-[8%]">
            <span onClick={toggleDropdown} className="flex gap-2 items-center cursor-pointer">
              <FaRegUser size={30} className="bg-gray-200 p-1 rounded-full text-black" /><span className="sm:black hidden">{`Hi, ${loggedInUser?.firstName} !`}</span>
            </span>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg py-2 z-50">
                <p className="block px-4 py-2">{loggedInUser?.email}</p>
                <p className="block px-4">{`Role : ${loggedInUser?.role}`}</p>
                {loggedInUser?.role === "admin" && (
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-200">My Dashboard</a>
                )}
                <button className="block px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
           )}
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
