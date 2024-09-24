import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.current = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.current = null;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(actions.fetchCategories.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.categories = action.payload.gotCategories;
  //     });
  //     builder.addCase(actions.fetchCategories.rejected, (state, action) => {
  //       state.categories = action.payload;
  //       state.isLoading = false;
  //       state.errMsg = action.payload.message;
  //     });
  //   },
});

export const { register } = userSlice.actions;

export default userSlice.reducer;
