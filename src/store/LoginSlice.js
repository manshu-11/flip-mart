import { createSlice } from "@reduxjs/toolkit";
const LoginSlice = createSlice({
  name: "login-slice",
  initialState: {
    //userDetails: { name: 'Manav', email: 'manav@gmail.com' },
    userDetails: null,
    warningAlert: false,
  },
  reducers: {
    setUserDetail(state, action) {
      state.userDetails = action.payload;
    },
    setWarning(state, action) {
      state.warningAlert = action.payload;
    },
  },
});
export const { setUserDetail, setWarning } = LoginSlice.actions;
export default LoginSlice.reducer;
