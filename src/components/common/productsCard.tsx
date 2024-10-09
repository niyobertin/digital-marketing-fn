import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

interface Product {
    _id: string | null | undefined;
    name: string;
    price: number;
    images: string[];
    createdAt: string;
    ownerContact: string;
}

interface ProductsCardsProps {
    productsPerPage:number,
    products: Product[];
    loading?: boolean;
}



const ProductsCards: React.FC<ProductsCardsProps> = ({productsPerPage, products, loading = false }) => {
    const navigate = useNavigate();
    const handleClick = (id: string) => {
        navigate(`/products/${id}`);
      };

    return (
        <div className="w-full">
            <div className="grid sm:grid-cols-4 grid-cols-2 gap-6 cursor-pointer">
                {(loading ? Array.from(new Array(8)) : products)?.slice(-productsPerPage).map((product, index) => (
                    <div
                        key={product ? product._id || index : index}
                        className="flex-shrink-0 w-full h-76 bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105 hover:shadow-xl"
                        onClick={() => product && handleClick(product._id!)}
                    >
                        {product ? (
                            <>
                                 <div className="h-36">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-contain rounded-lg mb-2 mx-auto"
                                    />
                                </div>
                                <h2 className="sm:text-xl text-normal font-bold mb-2">{product.name}</h2>
                                <p className="Sm:text-lg text-normal mb-2">RWF{product.price.toFixed(2)}</p>
                                <div className="bg-[#25FD54] p-[1px] mb-[3%]"></div>
                                <p className="text-sm mb-4">
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
                                <Skeleton variant="rectangular" width="100%" height={118} className="mx-auto mb-2" />
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
        </div>
    );
};

export default ProductsCards;
