import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import FilterSlice from "./FilterSlice";
import BagSlice from "./BagSlice";
import LoginSlice from "./LoginSlice";

const cartStore = configureStore({
	reducer: {
		cart: CartSlice,
		filter: FilterSlice,
		bag: BagSlice,
		login: LoginSlice
	}
});
export default cartStore;