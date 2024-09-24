import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";
import { Product,productsState } from "../../types";

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
          .addCase(fetchProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false;
            state.error = action.payload || null;
          })
    
    }
})

export default productsReducer.reducer;