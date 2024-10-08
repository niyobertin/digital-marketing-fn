import React, { useState } from "react";
import logoImage from '../../../assets/image.png';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
interface ProductNavbarProps {
  categories: string[]; 
  all:string;
  onClick: () => void;
  onFilterChange: (filter: string) => void; 
}

const ProductNavbar: React.FC<ProductNavbarProps> = ({categories,all,onClick, onFilterChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const loggedIn: any = localStorage.getItem('accessToken');
  const loggedInUserString:any = localStorage.getItem('loggedin_user');
  const  loggedInUser = JSON.parse(loggedInUserString);
  const scrollContainerRef = React.useRef<HTMLUListElement>(null);
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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150, 
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className=" fixed flex items-center w-full justify-between pt-5 pb-5 text-white z-50 transition-all duration-300 bg-[#1d3126]"
      >
         {/* Hamburger Menu for Mobile */}
         <div className="md:hidden ml-[3%]">
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
        <div className="flex justify-center gap-8 items-center ml-[15%]">
          <Link to="/" className="flex items-center">
          <img src={logoImage} alt="logo" className="h-6" />
          <span className="text-2xl font-bold">Nzamura</span>
          </Link>
        </div>
        {!loggedIn ? (
                <div className="relative ml-[25%] sm:hidden block">
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
        ) : ''}
        {/* Links for Desktop */}
        <div className="flex items-center justify-between mx-2 ml-[3%] w-[50%]">
          <p className="sm:block hidden cursor-pointer hover:underline" onClick={onClick}>{all}</p>
      <ul 
        ref={scrollContainerRef} 
        className="sm:flex hidden overflow-x-auto whitespace-nowrap w-full scroll-smooth">
        {categories.map((category, index) => (
          <li key={index} className="mx-2">
            <span 
              onClick={() => onFilterChange(category)} 
              className="cursor-pointer hover:underline">
              {category}
            </span>
          </li>
        ))}
      </ul>
      <button 
        onClick={scrollLeft} 
        className="sm:block hidden px-1 bg-gray-400 text-white rounded-l hover:bg-gray-500 transition">
        {"<"}
      </button>
      <button 
        onClick={scrollRight} 
        className="sm:block hidden px-1 bg-gray-400 text-white rounded-r hover:bg-gray-500 transition">
        {">"}
      </button>
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
        
        <ul className="mt-16 flex flex-col gap-4 p-4">
        <p className="cursor-pointer hover:underline" onClick={onClick}>{all}</p>
          {categories.map((category, index) => (
            <li key={index}>
               <span onClick={() => {
                  onFilterChange(category); 
                }}  className="cursor-pointer">
                  {category}
                </span>
            </li>
          ))}
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

export default ProductNavbar;
