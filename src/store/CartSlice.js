import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';
const CartSlice = createSlice({
	name: "cart-slice",
	initialState: {
		cartData: [],
		isLogin: false,
		isCurrencyChange: true,
		exchangeRate: 84.71,
		productID: 0
	},
	reducers: {
		setCartData(store, action) {
			const data = action.payload;
			store.cartData = [...data];
		},
		setChangeCurrency(store, action) {
			store.isCurrencyChange = action.payload;
		},
		setProductID(store, action) {
			store.productID = action.payload;
		},
	}
});
export const { setCartData, setChangeCurrency, setIsLogin, setProductID } = CartSlice.actions;
export default CartSlice.reducer;