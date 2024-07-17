import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  detail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const orderSlicer = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
    },
    orderFailure: (state, action) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
    },
    getOrdersRequest: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    getOrdersSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.loading = false;
    },
    getOrdersFailure: (state, action) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
    },
    getOrderDetailRequest: (state, action) => {
      state.detail.error = null;
      state.detail.loading = true;
    },
    getOrderDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.detail.data = data;
      state.detail.loading = false;
    },
    getOrderDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.detail.loading = false;
      state.detail.error = error;
    },
  },
});

export const {
  orderRequest,
  orderSuccess,
  orderFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailure,
} = orderSlicer.actions;

export default orderSlicer.reducer;
