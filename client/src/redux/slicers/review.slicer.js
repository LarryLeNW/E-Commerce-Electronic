import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratingsProduct: {
    data: [],
    loading: false,
    error: null,
  },
};

export const reviewSlicer = createSlice({
  name: "review",
  initialState,
  reducers: {
    getRatingsRequest: (state, action) => {
      state.ratingsProduct.loading = true;
      state.ratingsProduct.error = null;
    },
    getRatingsSuccess: (state, action) => {
      const { response } = action.payload;
      state.ratingsProduct.data = response;
      state.ratingsProduct.loading = false;
    },
    getRatingsFailure: (state, action) => {
      const { error } = action.payload;
      state.ratingsProduct.loading = false;
      state.ratingsProduct.error = error;
    },
    ratingProductRequest: (state, action) => {
      state.ratingsProduct.loading = true;
      state.ratingsProduct.error = null;
    },
    ratingProductSuccess: (state, action) => {
      const { response } = action.payload;
      state.ratingsProduct.data.push(response.review);
      state.ratingsProduct.loading = false;
    },
    ratingProductFailure: (state, action) => {
      const { error } = action.payload;
      state.ratingsProduct.loading = false;
      state.ratingsProduct.error = error;
    },
  },
});

export const {
  getRatingsRequest,
  getRatingsSuccess,
  getRatingsFailure,
  ratingProductRequest,
  ratingProductSuccess,
  ratingProductFailure,
} = reviewSlicer.actions;

export default reviewSlicer.reducer;
