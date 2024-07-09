// store.js
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../Redux/ProductsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});
