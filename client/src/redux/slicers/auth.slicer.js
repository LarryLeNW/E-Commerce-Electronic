import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: {
    data: null,
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
};

export const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loginData.loading = true;
      state.loginData.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.loginData.loading = false;
      state.userInfo.data = data;
    },
    loginFailure: (state, action) => {
      const { error } = action.payload;
      state.loginData.loading = false;
      state.loginData.error = error;
    },
    getUserInfoRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    getUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },
    changeAvatarRequest: (state, action) => {
      state.userInfo.error = null;
      state.userInfo.loading = true;
    },
    changeAvatarSuccess: (state, action) => {
      const { avatar } = action.payload;
      state.userInfo.data = { ...state.userInfo.data, avatar };
      state.userInfo.loading = false;
    },
    changeAvatarFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },
    changeInfoRequest: (state, action) => {
      state.userInfo.error = null;
      state.userInfo.loading = true;
    },
    changeInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    changeInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },
    logout: (state, action) => {
      Cookies.remove("refreshToken");
      state.userInfo.data = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
  changeInfoRequest,
  changeInfoSuccess,
  changeInfoFailure,
  logout,
} = authSlicer.actions;

export default authSlicer.reducer;
