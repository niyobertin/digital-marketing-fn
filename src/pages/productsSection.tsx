import React, { useState } from "react";
import ProductsCards from "../components/common/productsCard"; 
import { HiArrowCircleRight } from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    listedDate: string;
    ownerContact: string;
}

const productData: Product[] = [
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    {
        id: 1,
        name: "Product 1",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-21",
        ownerContact: "owner1@example.com",
    },
    {
        id: 2,
        name: "Product 2",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150",
        listedDate: "2024-09-20",
        ownerContact: "owner2@example.com",
    },
    // Add more products here
];

const PRODUCTS_PER_PAGE = 6; 

const ProductSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productData.length / PRODUCTS_PER_PAGE);
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = productData.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    return (
        <div className="sm:ml-[8%] ml-
        [2%] sm:mr-[8%] mr-[2%]" id="products">
            <div>
                <p className="text-center pt-[4%]">PRODUCTS</p>
                <h1 className="text-[#25FD54] font-bold text-5xl text-center pb-[2%]">For You</h1>
                <ProductsCards products={currentProducts} /> 
            </div> 
            {/* Pagination controls */}
            <div className="flex justify-center items-center space-x-4 mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2  rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <HiArrowCircleLeft size={30} color="#233a2f" />
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <HiArrowCircleRight size={30} color="#233a2f" />
                </button>
            </div>
        </div>
    );
};

export default ProductSection;
