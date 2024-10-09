import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Layout from "../../components/common/dashboardLayout";
import TextInput from "../../components/common/textInput";
import FileUpload from "../../components/common/fileUpload";
import { addProduct } from "../../redux/reducers/products.reducers";
import { productSchema } from "../../schema/productsSchema";
import { RootState } from "../../redux/api/store";
export type ErrorType = {
  error?: string;
};

export const SellerDashboard = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const isloading = useSelector((state: RootState) => state.addProduct.isLoading);
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleRemoveFile = (
    file: File,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const onSubmit = async (data:any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categories",data.categories);
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (data.images && data.images.length > 0) {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });
    }
    try {
        setLoading(true);
            //@ts-ignore
        const response = await dispatch(addProduct(formData)).unwrap();
        setLoading(false);
        toast.success("Product added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError<ErrorType>;
      toast.error(error.message);
    }
  };

  const handleRemoveExistingImage = (
    index: number,
    image: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setRemoveImages((prevIndexes) => [...prevIndexes, image]);
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <ToastContainer />
                 <div className="text-black text-center">
                    <h1 className="text-3xl font-bold">Add New Products</h1>
                </div>
      <section className="mt-24 lg:pl-5 2xl:max-w-[90%] mx-auto">
        <button type="button">
          <Link
            to="/dashboard/products"
            className="text-dark-gray flex items-center gap-2 mb-4"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </Link>
        </button>

        <h1 className="text-[18px] font-bold">Product Information</h1>
        <form
          className="flex gap-4 flex-col lg:flex-row w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-[60%]">
            <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-2 w-[100%] gap-4">
              <TextInput
                label="Product name"
                placeholder="Name"
                register={register}
                name="name"
                error={errors.name?.message}
              />
               <TextInput
                label="Category"
                placeholder="Categiry"
                register={register}
                name="categories"
                error={errors.categories?.message}
              />
              <TextInput
                label="Price"
                placeholder="00.00"
                register={register}
                name="price"
                type="number"
                error={errors.price?.message}
              />
            </div>
            <div className="">
              <h5 className="text-[#161616] block text-lg mb-2">Description</h5>
              <textarea
                className="w-full bg-white text-dark-gray border-[0.5px] border-[#E5E5E5] rounded-[8px] px-4 py-2 focus:outline-none h-32"
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="lg:mt-2 flex gap-4 flex-col w-full lg:w-[40%]">
            <h5 className="text-lg block text-dark-gray">Images</h5>
            <div className="w-full">
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    {...field}
                    onDrop={(acceptedFiles) => {
                      handleDrop(acceptedFiles);
                      field.onChange([...files, ...acceptedFiles]);
                    }}
                    remove={(file, event) => {
                      // @ts-ignore
                      handleRemoveFile(file, event);
                      field.onChange(files.filter((f) => f !== file));
                    }}
                    files={files}
                    existingImages={existingImages}
                    removeExistingImage={handleRemoveExistingImage}
                  />
                )}
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>
            <button
                        type="submit"
                        className="w-full p-[1%] bg-gradient-to-r from-[#98AA28] to-[#D6EF7E] font-bold sm:mt-[6%] mt-[17%] rounded-[30px] px-8"
                    >
                        {loading ? 'Loading...' : 'Publish Product'}
                    </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}