import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    listedDate: string;
    ownerContact: string;
}

interface ProductsCardsProps {
    products: Product[];
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-lg p-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="text-lg text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                    <div className="bg-[#25FD54] p-[1px] mt-[3%]"></div>
                    <p className="text-sm text-gray-500 mb-4">Listed on: {product.listedDate}</p>
                    <p className="text-sm text-blue-600">Contact: {product.ownerContact}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductsCards;
