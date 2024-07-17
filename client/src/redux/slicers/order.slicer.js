import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
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
    getOrderRequest: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    getOrderSuccess: (state, action) => {
      const { data } = action.payload;
      console.log("🚀 ~ data:", data);
      state.data = data;
      state.loading = false;
    },
    getOrderFailure: (state, action) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  orderRequest,
  orderSuccess,
  orderFailure,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
} = orderSlicer.actions;

export default orderSlicer.reducer;
