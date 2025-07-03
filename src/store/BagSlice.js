import { createSlice } from "@reduxjs/toolkit";
const BagSlice = createSlice({
  name: "bag-slice",
  initialState: {
    cartItem: [],
    saveItem: [],
    deleteProdStatus: null,
    fontLoad: false,
  },
  reducers: {
    setCartItem(state, action) {
      state.cartItem.push(action.payload);
    },
    setShowWarning(state, action) {
      state.deleteProdStatus = action.payload;
    },
    setDeleteProdId(state, action) {
      state.deleteProdID = action.payload;
    },
    setEmptyCart(store, action) {
      store.cartItem = action.payload;
      store.saveItem = action.payload;
    },
    updateItemCount(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItem.find(
        (productObj) => productObj.productObj.id === id
      );
      if (item) {
        item.productQty = quantity;
      }
    },
    removeCartItem(state, action) {
      const itemID = action.payload;
      state.cartItem = state.cartItem.filter(
        (productObj) => productObj.productObj.id !== itemID
      );
    },
    removeSaveItem(state, action) {
      const saveItemID = action.payload;
      state.saveItem = state.saveItem.filter(
        (productObj) => productObj.productObj.id !== saveItemID
      );
    },
    setItemSaveLater(state, action) {
      state.saveItem.push(action.payload);
    },
    setItemMoveToCart(state, action) {
      state.cartItem.push(action.payload);
    },
    setFontLoaded(state, action) {
      state.fontLoad = action.payload;
    },
  },
});
export const {
  setCartItem,
  setShowWarning,
  updateItemCount,
  setEmptyCart,
  removeCartItem,
  removeSaveItem,
  setItemSaveLater,
  setItemMoveToCart,
  setFontLoaded,
} = BagSlice.actions;
export default BagSlice.reducer;
