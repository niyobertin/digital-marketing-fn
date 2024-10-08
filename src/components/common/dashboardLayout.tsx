import { useState } from 'react';
import { FaRegUser, FaHome, FaQuestionCircle, FaTimes } from 'react-icons/fa';
import { CiLogout } from "react-icons/ci";
import { MdAddShoppingCart } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FaUsersCog } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { NavLink} from 'react-router-dom';
import Hamburger from 'hamburger-react';
import logoImage from '../../assets/image.png';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const loggedInUserString:any = localStorage.getItem('loggedin_user');
  const  loggedInUser = JSON.parse(loggedInUserString);
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedin_user');
    window.location.href = '/';  
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:inset-0
          transition-transform duration-300 ease-in-out
          w-64 bg-[#1d3126] text-white p-5
        `}
      >
        <div className="flex justify-between items-center mb-5 ">
        
          <h1 className="font-bold text-lg">
          <a href="/"> <div className="flex items-center ml-[8%]">
                <img src={logoImage} alt="logo" className="h-6" />
                <span className="text-2xl font-bold">Nzamura</span>
              </div>
        </a>
          </h1>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        
        <nav className="flex text-xl flex-col gap-4 ml-[8%] pt-[10%] font-bold">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)} 
          >
            <FaHome size={25}/> Dashboard
          </NavLink>
          {loggedInUser?.role === "admin" && (
            <>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
          
            </NavLink>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaUsersCog size={30}/> Manage users
            </NavLink>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaQuestionCircle size={25}/> Querries
            </NavLink>
            </>
          )}
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <AiFillProduct size={25}/> Products
          </NavLink>
          <NavLink
            to="/dashboard/add-products"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <MdAddShoppingCart size={25}/> Add Products
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <TiMessages size={25}/> Messages
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <MdPayments size={25} /> Payment
          </NavLink>
        </nav>
        <div className='py-[5%] font-bold'>
        <button className="flex items-center justify-center px-4 text-xl gap-2 text-red-500" onClick={handleLogout}><span><CiLogout size={25}/></span>Logout</button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-[#1d3126] text-white p-5 shadow-md">
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Hamburger toggled={isSidebarOpen} toggle={setSidebarOpen} size={24} />
            </div>
            <h2 className="sm:block hidden text-xl font-semibold">
              {`Hi ${loggedInUser?.firstName} ${loggedInUser?.secondName}, Welcome to Nzamura !`}
            </h2>
          </div>
          <div className="relative">
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
        </header>
        <main className="p-5 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;