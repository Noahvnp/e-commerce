import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.gotCategories;
    });
    builder.addCase(actions.fetchCategories.rejected, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.errMsg = action.payload.message;
    });
  },
});

export const {} = appSlice.actions;

export default appSlice.reducer;
