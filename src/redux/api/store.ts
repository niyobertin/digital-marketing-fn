import { configureStore } from "@reduxjs/toolkit";
import productsReducers from "../reducers/products.reducers";
import usersReducers from '../reducers/athentications.reducer';

export const store = configureStore({
    reducer:{
        products:productsReducers,
        addProduct:productsReducers,
        login:usersReducers,
        register:usersReducers,

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;