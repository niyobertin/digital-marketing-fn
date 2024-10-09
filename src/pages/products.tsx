import React, { useEffect, useState } from "react";
import { RootState,AppDispatch } from "../redux/api/store";
import { useDispatch,useSelector } from "react-redux";
import ProductsCards from "../components/common/productsCard"; 
import { HiArrowCircleRight } from "react-icons/hi";
import { HiArrowCircleLeft } from "react-icons/hi";
import { fetchProducts } from "../redux/reducers/products.reducers";
import ProductNavbar from "../components/common/header/productsPageNav";
import Footer from "../components/common/footer";
import { IoSearch } from "react-icons/io5";
interface Product {
    categories: string;
    _id: null | undefined;
    name: string;
    price: number;
    images: string[];
    createdAt: string;
    ownerContact: string;
}

let productData: Product[] = []

const Products: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {products,isLoading,error} = useSelector((state:RootState) => state.products);
    const [itemsToShow, setItemsToShow] = useState(8);
    const [productsfil, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setItemsToShow(value);
    };
    let productCategories:string[] = [];
    const handleFilterChange = (category: string) => {
        const filteredProducts:any = productData.filter(
          (product) => product.categories === category
        );
        setProducts(filteredProducts);
        setCurrentPage(1);
      };

    useEffect(() => {
        if(!isLoading){
             dispatch(fetchProducts());
        }
    },[]);
    //@ts-ignore
    productData = products.data
    if (productData) {
        productData.forEach(product => {
          productCategories.push(product.categories);
        });
      }
      const totalPages = Math.ceil((productsfil?.length > 0 ? productsfil?.length : productData?.length) / itemsToShow);
    const startIdx = (currentPage - 1) * itemsToShow;

    let currentProducts: Product[] = (productsfil?.length > 0 ? productsfil : productData || []).slice(startIdx, startIdx + itemsToShow);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleReset = () =>{
        setProducts(productData);
        setCurrentPage(1);
    }
     
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value); 

        const filteredProducts = productData.filter((product) => {
            const priceMatch = product.price === parseInt(value);
            const nameMatch = product.name.toLowerCase().includes(value.toLowerCase());
            return priceMatch || nameMatch;
        });

        setProducts(filteredProducts);
    };
    if(error) return <div>{error}</div>

    return (
        <>
       <div>
        <div className="">
        <ProductNavbar
            categories={productCategories}
            all="All"
            onClick={handleReset}
            onFilterChange={handleFilterChange}
        />
        </div>
       <div className="relative sm:ml-[8%] ml-[2%] sm:mr-[8%] mr-[2%] sm:mb-[10%] mb-[24%] sm:top-28 top-20">
            <div>
                <h1 className="text-black font-bold text-3xl text-center pb-[2%]mt-36">List of Producs</h1>
                <div>
                      <div>
                      <h1 className="sm:text-xl text-normal font-bold">Search for Products</h1>
                        <p>
                            The search bar below allows you to effortlessly explore our available products. 
                            Simply type in the product name or price to instantly retrieve real-time results.
                        </p>
                      </div>
                        <div className="sm:flex block justify-between items-center py-2 mb-[3%]">
                        <span className="flex items-center sm:w-[86%] w-full gap-2 text-black border border-[2px] border-green-300 rounded-[20px]"><IoSearch size={20} /><input type="text" className="py-1 sm:w-[96%] w-[82%] focus:outline-none" placeholder="Seach by product name or price"
                        value={searchTerm}
                        onChange={handleSearch}
                        />
                        <button className="font-semibold text-lg border-[2px] px-2 bg-gray-300 rounded-[20px]">Search</button>
                        </span>
                      </div>

                </div>
                {isLoading ? <ProductsCards productsPerPage={itemsToShow} products={[]} loading={true} /> : <ProductsCards productsPerPage={itemsToShow} products={currentProducts} loading={false} />
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
                <span className="sm:text-normal text-sm">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <HiArrowCircleRight size={30} color="#233a2f" />
                </button>
                <div>
                <select name="cars" id="cars" className="border border-green-400 rounded-md focus:outline-none"
                onChange={handleSelectChange}
                value={itemsToShow}>
                    <option value="8">show 8</option>
                    <option value="12">show 12</option>
                    <option value="16">show 16</option>
                    <option value="20">show 20</option>
                    <option value="24">show 24</option>
                    <option value="24">show 28</option>
                    <option value="32">show 32</option>
                </select>
                </div>
            </div>
        </div>
        <Footer/>
       </div>
</>
    );
};

export default Products;
