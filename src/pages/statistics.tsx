import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/api/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/products.reducers";
import { Product } from "../types";

let productData: Product[] = [];
const Statistics:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { products } = useSelector(
        (state: RootState) => state.products
      );
      
      useEffect(() => {
          dispatch(fetchProducts());
      }, [dispatch]);
    
      //@ts-ignore
      productData = products.data; 
    return(
        <div className="pt-[4%] pb-[4%] sm:ml-[8%] ml-
        [2%] sm:mr-[8%] mr-[2%]">
            <div className="sm:flex grid grid-cols-2 justify-between text-center">
            <div className="font-bold">
                <h1 className="text-4xl">25</h1>
                <p>Years of experience</p>
            </div>
            <div className="font-bold">
                <h1 className="text-4xl">99</h1>
                <p>Total Users</p>
            </div>
            <div className="font-bold">
                <h1 className="text-4xl">{productData ? productData.length : 0}</h1>
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