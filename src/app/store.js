// store.js
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../Redux/ProductsSlice';
import {cartReducer} from "../Redux/CartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart:cartReducer,
    },
});
