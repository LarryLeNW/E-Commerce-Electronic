import { createSlice } from "@reduxjs/toolkit";
import qs from "qs";

const locationSearch = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

const initialState = {
  modal: {
    isShow: false,
    children: null,
  },
  filterParams: {
    category: locationSearch.category,
    keyword: locationSearch.keyword || "",
    sort: locationSearch.sort || undefined,
    priceFrom: locationSearch.priceFrom || undefined,
    priceTo: locationSearch.priceTo || undefined,
  },
};

export const commonSlicer = createSlice({
  name: "common",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal.isShow = action.payload.isShowModal;
      state.modal.children = action.payload.children;
    },
    setFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
    clearFilterParams: (state) => {
      state.filterParams = {
        category: [],
        keyword: "",
        sort: undefined,
        priceFrom: undefined,
        priceTo: undefined,
      };
    },
  },
});

export const { showModal, setFilterParams, clearFilterParams } =
  commonSlicer.actions;

export default commonSlicer.reducer;