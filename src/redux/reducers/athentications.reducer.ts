import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";
import { Login,LoginState,RegisterState,Register } from "../../types";

interface UserLoginPayload {
    email: string;
    password: string;
  }
interface UserRegisterPayload{
    firstName:string;
    secondName?:String;
    gender:string;
    dob:Date;
    email:string;
    password:string;
}

export const userLogin = createAsyncThunk<Login[], UserLoginPayload, { rejectValue: string }>(
    'users/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/users/login',userData);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
);

export const userRegister = createAsyncThunk<Register[], UserRegisterPayload, { rejectValue: string }>(
    'users/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/users/register',userData);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
);

const initialState:LoginState ={
    user:[],
    loading:false,
    error:null
}

const usersReducer = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(userLogin.pending,(state) => {
            state.loading = true;
        })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<Login[]>) => {
            state.loading = false;
            //@ts-ignore
            state.user = action.payload;
          })
          .addCase(userLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.error = action.payload || null;
          })
          .addCase(userRegister.pending,(state) => {
            state.loading = true;
        })
        .addCase(userRegister.fulfilled, (state, action: PayloadAction<Login[]>) => {
            state.loading = false;
            //@ts-ignore
            state.user = action.payload;
          })
          .addCase(userRegister.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.error = action.payload || null;
          })
    
    }
})

export default usersReducer.reducer;