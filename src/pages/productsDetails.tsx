import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../types";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../redux/reducers/products.reducers";
import { AppDispatch, RootState } from "../redux/api/store";
import Footer from "../components/common/footer";
import MainHeader from "../components/common/header/mainHeader";

const ProductDetails = () => {
    const dispatch: AppDispatch = useDispatch();
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const { id } = useParams<{ id: string }>();
    const { products, isLoading, error } = useSelector(
        (state: RootState) => state.singleProduct
    );

    const handleImage = (url: string, index: number) => {
        setMainImage(url);
        setActiveImage(index);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [id]);

    return (
        <div className="h-screen">
            <MainHeader />
            <div className="mr-[8%] ml-[8%] max-auto py-10 pt-20">
                {isLoading ? (
                    <Stack spacing={2}>
                        <Skeleton variant="rectangular" width="100%" height={200} />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="100%" />
                    </Stack>
                ) : (
                    products[0] && (
                        <>
                            <Stack gap={2} direction={{ xs: "column", sm: "column", md: "row" }}>
                                <Stack
                                    width={{ xs: "90%", sm: "90%", md: "60%" }}
                                    marginX="auto"
                                    alignItems="center"
                                    direction={{
                                        xs: "column-reverse",
                                        sm: "column-reverse",
                                        md: "row",
                                    }}
                                    className="rounded-lg"
                                    gap={2}
                                >
                                    <Stack
                                        direction={{ xs: "row", sm: "row", md: "column" }}
                                        gap={2}
                                        overflow="scroll"
                                    >
                                        {products[0]?.images.map((img, index) => (
                                            <img
                                                width={100}
                                                height={100}
                                                alt="some alt here"
                                                src={img}
                                                className={`rounded-md ${activeImage === index ? "border-[5px] border-green-600" : ""} cursor-pointer max-w-[170px] w-[100%] max-h-[100px] h-full`}
                                                key={index}
                                                onClick={() => handleImage(img, index)}
                                            />
                                        ))}
                                    </Stack>

                                    <Stack>
                                        <img
                                            width="100%"
                                            height={500}
                                            className="rounded-md cursor-pointer sm:h-60 max-auto flex-1"
                                            alt="main prod"
                                            src={mainImage || products[0]?.images[0]}
                                            style={{
                                                maxWidth: "500px",
                                                maxHeight: "500px",
                                                objectFit: "contain",
                                                minWidth: "100%",
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack
                                    width={{ xs: "90%", sm: "90%", md: "40%" }}
                                    className=""
                                    marginX="auto"
                                >
                                    <Stack gap={4} className="flex-1">
                                        <Stack>
                                            <Typography variant="h5">{products[0]?.name}</Typography>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                className=""
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Typography variant="h4" className="text-[24px] font-bold">
                                                        {products[0]?.price} Rwf
                                                    </Typography>
                                                </div>
                                            </Stack>
                                            <Typography className="text-sm mb-4">
                                                Listed on: {new Date(products[0]?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Typography>
                                        </Stack>
                                        <Divider/>
                                        <div className="pt-[3%]">
                                          <Typography>{products[0]?.description}</Typography>
                                        </div>
                                    </Stack>
                                </Stack>
                            </Stack>
                           <div>
                           <Typography>I this available</Typography>
                           </div>
                        </>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
