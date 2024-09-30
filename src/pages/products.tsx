import React, { useEffect, useState } from "react";
import { RootState,AppDispatch } from "../redux/api/store";
import { useDispatch, UseDispatch,useSelector } from "react-redux";
import ProductsCards from "../components/common/productsCard"; 
import { HiArrowCircleRight } from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";
import { fetchProducts } from "../redux/reducers/products.reducers";
interface Product {
    _id: null | undefined;
    name: string;
    price: number;
    images: string[];
    createdAt: string;
    ownerContact: string;
}

let productData: Product[] = []

const PRODUCTS_PER_PAGE = 6; 

const Products: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {products,isLoading,error} = useSelector((state:RootState) => state.products);

    useEffect(() => {
        if(!isLoading){
            dispatch(fetchProducts())
        }
    },[]);
    //@ts-ignore
    productData = products.data
    const totalPages = Math.ceil(productData?.length / PRODUCTS_PER_PAGE);
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = productData?.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    if(error) return <div>{error}</div>
    return (
        <div className="sm:ml-[8%] ml-
        [2%] sm:mr-[8%] mr-[2%] mb-[4%]" id="products">
            <div>
                <p className="text-center pt-[4%]">PRODUCTS</p>
                <h1 className="text-[#25FD54] font-bold text-5xl text-center pb-[2%]">For You</h1>
                {isLoading ? <ProductsCards products={[]} loading={true} /> : <ProductsCards products={currentProducts} loading={false} />
            }
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

export default Products;
