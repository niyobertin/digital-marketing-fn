import React from "react";

const Statistics:React.FC = () => {
    return(
        <div className="pt-[4%] pb-[4%] sm:ml-[8%] ml-
        [2%] sm:mr-[8%] mr-[2%]">
            <div className="sm:flex grid grid-cols-2 justify-between text-center">
            <div className="font-bold">
                <h1 className="text-4xl">25</h1>
                <p>Years of experience</p>
            </div>
            <div className="font-bold">
                <h1 className="text-4xl">99%</h1>
                <p>Customer satisfaction</p>
            </div>
            <div className="font-bold">
                <h1 className="text-4xl">1800</h1>
                <p>Total Products</p>
            </div>
            <div className="font-bold">
                <h1 className="text-4xl">42</h1>
                <p>Products Owners</p>
            </div>
        </div>
        <div className="bg-[#25FD54] p-0.5 mt-[3%]"></div>
        </div>
    )
};

export default Statistics;