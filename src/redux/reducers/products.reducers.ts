import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";
import { Product,productsState } from "../../types";
import { AxiosError } from "axios";

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'blogs/fetchBlogs',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/products');
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
);
export const fetchProduct = createAsyncThunk<Product[],string,{rejectValue:string}>(
  'blogs/:id',
  async(id,{rejectWithValue}) => {
    try {
      const response = await api.get(`/products/${id}`);
        return response.data.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
)
export const addProduct = createAsyncThunk(
  "addProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/products", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

const initialState:productsState ={
    products:[],
    isLoading:false,
    error:null
}

const productsReducer = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.isLoading = false;
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || null;
          })
          .addCase(fetchProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || null;
        })
        .addCase(addProduct.pending,(state) => {
             state.isLoading = true;
        })
        .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.isLoading = false;
            state.products = action.payload;
          })
          //@ts-ignore
          .addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
          })
    }
})

export default productsReducer.reducer;