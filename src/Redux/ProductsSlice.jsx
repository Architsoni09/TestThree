// ProductsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productData: [],
    isLoading: true,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.isLoading = false;
            console.log(action);
            state.productData = action.payload;
        },
        fetchProductsError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        addProduct(state, action) {
            state.productData.push(action.payload);
        },
        editProduct(state, action) {
            const index = state.productData.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.productData[index] = action.payload;
            }
        },
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsError, addProduct, editProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
// Adjusted selector to access correct state path
