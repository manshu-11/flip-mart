import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';
const FilterSlice = createSlice({
	name: "filter-slice",
	initialState: {
		categories: [],
		priceRange: null,
		ratingRange: null
	},
	reducers: {
		setCategory(store, action) {
			if (!store.categories.includes(action.payload)) {
				store.categories.push(action.payload);
			}
		},
		removeCategory(store, action) {
			const updateCategoryFilter = store.categories.filter(ele => ele !== action.payload);
			console.log(updateCategoryFilter);
			store.categories = updateCategoryFilter;
		},
		setPriceRange(store, action) {
			store.priceRange = action.payload;
		},
		removePriceRange(store, action) {
			store.priceRange = action.payload;
		},
		setRatingRange(store, action) {
			store.ratingRange = action.payload;
		},
		removeRatingRange(store, action) {
			store.ratingRange = action.payload;
		}
	}
});
export const { setCategory, removeCategory, setPriceRange, removePriceRange, setRatingRange, removeRatingRange } = FilterSlice.actions;
export default FilterSlice.reducer;