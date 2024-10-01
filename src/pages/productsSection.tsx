import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/api/store";
import { useDispatch, useSelector } from "react-redux";
import ProductsCards from "../components/common/productsCard";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { fetchProducts } from "../redux/reducers/products.reducers";

interface Product {
  _id: null | undefined;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
  ownerContact: string;
}

let productData: Product[] = [];

const PRODUCTS_PER_PAGE = 6;

const ProductsSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  //@ts-ignore
  productData = products.data;
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = productData?.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  if (error) return <div>{error}</div>;

  return (
    <div className="sm:ml-[8%] ml-[2%] sm:mr-[8%] mr-[2%] mb-[4%]" id="products">
      <div>
        <p className="text-center pt-[4%]">PRODUCTS</p>
        <h1 className="text-[#25FD54] font-bold text-4xl text-center pb-[2%]">
          For You
        </h1>

        {/* Product Cards with Tailwind CSS Marquee Animation */}
        <div className="overflow-hidden relative">
            <div className="flex space-x-4 py-4">
            {isLoading ? <ProductsCards products={[]} loading={true} /> : <ProductsCards products={currentProducts} loading={false} />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
