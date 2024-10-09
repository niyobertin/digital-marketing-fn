import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosClock } from "react-icons/io";

const MainHeader: React.FC = () => {
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
        <div className="fixed w-full bg-white text-back">
            <div className="flex w-full justify-between items-center py-3">
                <div className='flex sm:w-[40%] w-[30%] justify-start ml-[8%] items-center sm:gap-16 gap-6' >
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/products">Products</Link></p>
                </div>
                <div className='flex justify-center items-center gap-16 sm:w-[60%] w-[40%]'>
                    <p className='sm:flex hidden items-center gap-1'><MdEmail  /> nniyonkurubertin@gmail.com</p>
                    <p className='sm:flex hidden items-center gap-1'><FaPhone /> +250783021801</p>
                    <p className='flex items-center sm:text-normal text-sm gap-1 font-bold'><IoIosClock size={25} /> {currentTime}</p>  
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default MainHeader;
