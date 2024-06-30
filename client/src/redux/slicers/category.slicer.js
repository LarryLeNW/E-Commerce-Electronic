import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess: (state, action) => {
      const data = action.payload;
      state.loading = false;
      state.data = data;
    },
    getCategoriesFailure: (state, action) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
} = categorySlicer.actions;

export default categorySlicer.reducer;
