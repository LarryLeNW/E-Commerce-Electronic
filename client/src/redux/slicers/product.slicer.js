import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  review: {
    loading: false,
    error: null,
  },
};

export const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.data = data;
    },
    getProductDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },
    ratingProductRequest: (state, action) => {
      state.review.loading = true;
      state.review.error = null;
    },
    ratingProductSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.data.ratings = data;
      state.review.loading = false;
    },
    ratingProductFailure: (state, action) => {
      const { error } = action.payload;
      state.review.loading = false;
      state.review.error = error;
    },
  },
});

export const {
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  ratingProductRequest,
  ratingProductSuccess,
  ratingProductFailure,
} = productSlicer.actions;

export default productSlicer.reducer;
