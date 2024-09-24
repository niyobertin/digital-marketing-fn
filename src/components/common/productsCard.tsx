import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Product {
    _id: string | null | undefined;
    name: string;
    price: number;
    images: string[];
    createdAt: string;
    ownerContact: string;
}

interface ProductsCardsProps {
    products: Product[];
    loading?: boolean; 
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ products, loading = false }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading ? Array.from(new Array(3)) : products)?.map((product, index) => (
                <div key={product ? product._id || index : index} className="border rounded-lg shadow-lg p-4">
                    {product ? (
                        <>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-[70%] object-cover rounded-lg mb-[2%] mx-auto"
                            />
                            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                            <p className="text-lg text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                            <div className="bg-[#25FD54] p-[1px] mt-[3%]"></div>
                            <p className="text-sm text-gray-500 mb-4">
                                Listed on: {new Date(product.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                            <p className="text-sm text-blue-600">Contact: {product.ownerContact}</p>
                        </>
                    ) : (
                        <>
                            <Skeleton variant="rectangular" width="70%" height={118} className="mx-auto mb-[2%]" />
                            <Skeleton variant="text" width="60%" height={30} />
                            <Skeleton variant="text" width="40%" height={20} />
                            <Skeleton variant="rectangular" height={1} width="100%" className="mt-4" />
                            <Skeleton variant="text" width="50%" height={20} className="mt-2" />
                            <Skeleton variant="text" width="70%" height={20} className="mt-1" />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProductsCards;
