import { useState } from 'react';
import { FaRegUser, FaHome, FaBlog, FaQuestionCircle, FaPlusCircle, FaTimes } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Hamburger from 'hamburger-react';
import logoImage from '../../assets/image.png';
interface CustomJwtPayload {
  email?: string;
  role?: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const loggedIn: any = localStorage.getItem('accessToken');
  const loggedInUserString:any = localStorage.getItem('loggedin_user');
  const decoded = loggedIn ? jwtDecode(loggedIn) as CustomJwtPayload : null;
  const  loggedInUser = JSON.parse(loggedInUserString);
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedin_user');
    window.location.href = '/';  
  };
  const linkName = location.pathname.replace('/', '') || 'Dashboard';

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
        <div className="flex justify-between items-center mb-5 md:hidden">
          <h1 className="font-bold text-lg"><div className="flex items-center ml-[8%]">
          <img src={logoImage} alt="logo" className="h-6" />
          <span className="text-2xl font-bold">Nzamura</span>
        </div><a href="/">
          </a></h1>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="sm:flex hidden items-center ml-[8%]">
          <img src={logoImage} alt="logo" className="h-6" />
          <span className="text-2xl font-bold">Nzamura</span>
        </div>
        <nav className="flex flex-col gap-4 ml-[8%] pt-[10%] font-bold">
          <NavLink
            to="/dashboard/seller"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)} 
          >
            <FaHome /> Dashboard
          </NavLink>
          {loggedInUser?.role === "admin" && (
            <>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaPlusCircle /> Add Products
            </NavLink>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaPlusCircle /> Manage users
            </NavLink>
            <NavLink
              to="/add-blog"
              className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <FaQuestionCircle /> Querries
            </NavLink>
            </>
          )}
          <NavLink
            to="/products"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaBlog /> Products
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaPlusCircle /> Add Products
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaQuestionCircle /> Messages
          </NavLink>
          <NavLink
            to="/queries"
            className={({ isActive }) => `hover:text-yellow-300 flex items-center gap-2 ${isActive ? 'text-yellow-300' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FaQuestionCircle /> Payment
          </NavLink>
        </nav>
        <div className='py-[100%] font-bold'>
        <button className="block px-4 text-red-500" onClick={handleLogout}>Logout</button>
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
            <h2 className="text-xl font-semibold">
              {linkName.charAt(0).toUpperCase() + linkName.slice(1)}
            </h2>
          </div>
          <div className="relative">
            <span onClick={toggleDropdown} className="flex gap-2 items-center cursor-pointer">
              <FaRegUser size={30} className="bg-gray-200 p-1 rounded-full text-black" />
            </span>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg py-2 z-50">
                <p className="block px-4 py-2">{decoded?.email}</p>
                {decoded?.role === "admin" && (
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