import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogDetail: {
    data: {},
    loading: false,
    error: null,
  },
  blogList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
};

export const blogSlicer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogDetailRequest: (state, action) => {
      state.blogDetail.loading = true;
      state.blogDetail.error = null;
    },
    getBlogDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.blogDetail.loading = false;
      state.blogDetail.data = data;
    },
    getBlogDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.blogDetail.loading = false;
      state.blogDetail.error = error;
    },
    getBlogListRequest: (state, action) => {
      state.blogList.loading = true;
      state.blogList.error = null;
    },
    getBlogListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.blogList.loading = false;
      state.blogList.meta = meta;
      state.blogList.data = more ? [...state.blogList.data, ...data] : data;
    },
    getBlogListFailure: (state, action) => {
      const { error } = action.payload;
      state.blogList.loading = false;
      state.blogList.error = error;
    },
  },
});

export const {
  getBlogDetailRequest,
  getBlogDetailSuccess,
  getBlogDetailFailure,
  getBlogListRequest,
  getBlogListSuccess,
  getBlogListFailure,
} = blogSlicer.actions;

export default blogSlicer.reducer;
