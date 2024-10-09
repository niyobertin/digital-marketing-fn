import React, { useEffect} from "react";
import { RootState, AppDispatch } from "../redux/api/store";
import { useDispatch, useSelector } from "react-redux";
import ProductsCards from "../components/common/productsCard";
import { fetchProducts } from "../redux/reducers/products.reducers";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  _id: null | undefined;
  name: string;
  price: number;
  images: string[];
  createdAt: string;
  ownerContact: string;
}

let productData: Product[] = [];

const ProductsSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
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

  if (error) return <div>{error}</div>;

  return (
    <div className="sm:ml-[8%] ml-[2%] sm:mr-[8%] mr-[2%] mb-[4%]" id="products">
      <div>
        <p className="text-center pt-[1%]">PRODUCTS</p>
        <h1 className="text-[#25FD54] font-bold text-4xl text-center pb-[2%]">
          For You
        </h1>

        {/* Product Cards with Tailwind CSS Marquee Animation */}
        <div className="overflow-hidden relative">
            <div className="flex space-x-4 py-4">
            {isLoading ? <ProductsCards productsPerPage={8} products={[]} loading={true} /> : <ProductsCards productsPerPage={8} products={productData} loading={false} />}
            </div>
        </div>
        <div className="flex justify-center items-center pt-4">
        <Link to="/products">
        <button className=" border px-5 py-1 font-bold rounded-md">See More</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
