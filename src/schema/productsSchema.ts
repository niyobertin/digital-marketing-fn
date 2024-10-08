import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  categories:yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  images: yup
    .array()
    .of(yup.mixed().required("Image is required"))
    .min(2, "At least 2 images are required")
    .max(8, "No more than 8 images are allowed")
    .required("Images are required"),
});

export const updateProductSchema = yup.object().shape({
  name: yup.string().optional(),
  price: yup.number().typeError("Price must be a number").optional(),
  description: yup.string().optional(),
  images: yup.array().of(yup.mixed().optional()).optional(),
});