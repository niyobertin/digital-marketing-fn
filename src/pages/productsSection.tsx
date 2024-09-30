import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/api/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/products.reducers";
import { ProductSekleton } from "../components/common/skeleton/productsSekleton";

interface Product {
    _id: null | undefined;
    name: string;
    price: number;
    description: string;
    images: string[];
    createdAt: string;
    ownerContact: string;
}

const ProductSection: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state: RootState) => state.products);
    const [autoScrollIndex, setAutoScrollIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // Track if hovered

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //@ts-ignore
    const productData: Product[] = products?.data || [];
    const lastFiveProducts = productData.slice(-5);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (!isHovered) { // Only scroll if not hovered
                setAutoScrollIndex((prevIndex) => (prevIndex + 1) % lastFiveProducts.length);
            }
        }, 5000); 

        return () => clearInterval(autoScroll);
    }, [lastFiveProducts.length, isHovered]); // Add isHovered to dependency array

    if (error) return <div>{error}</div>;

    if (isLoading) {
        return (
            <div>
                <ProductSekleton />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] w-full sm:ml-[0%] ml-[2%] sm:mr-[8%] mr-[2%] mb-[4%]" id="products">
            <div>
                <p className="text-center text-lg font-medium">PRODUCTS</p>
                <h1 className="text-[#25FD54] font-bold text-4xl text-center pb-[2%]">For You</h1>
                <div className="relative w-full h-[70vh] overflow-hidden">
                    <div 
                        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${autoScrollIndex * 100}%)` }}
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)} 
                    >
                        {lastFiveProducts.map((product, index) => (
                            <div key={index} className="flex-shrink-0 w-full h-full flex items-center justify-center p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-white">
                                    <div className="p-4 bg-[#1d3126] rounded-[20px] max-h-[300px] overflow-y-auto flex flex-col justify-between">
                                        <div className="flex flex-col justify-center items-center">
                                            <h2 className="text-3xl font-bold text-white pt-2 pb-2">{product.name}</h2>
                                            <p className="font-bold pt-2 pb-2">${product.price}</p>
                                            <p className="text-center">{product.description}</p>
                                            <p>Owner Contact: {product.ownerContact}</p>
                                            <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-center h-full">
                                        {product.images && (
                                            <img
                                                src={product.images[0]} 
                                                alt={product.name}
                                                className="object-cover w-[70%] h-full"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
                {lastFiveProducts.map((_, index) => (
                    <div
                        key={index}
                        className={`h-3 w-3 rounded-full ${index === autoScrollIndex ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
