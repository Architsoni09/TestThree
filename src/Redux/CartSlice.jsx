import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.product.id === product.id);
            if (existingItemIndex === -1) {
                state.cartItems.push({ product, qty: 1 });
            } else {
                state.cartItems[existingItemIndex].qty += 1;
                console.log(state.cartItems[existingItemIndex]);
            }
        },
    }
});

export const cartReducer = CartSlice.reducer;
export const { addToCart } = CartSlice.actions;
