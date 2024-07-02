import axios from "config/axios";

export const register = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const login = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
    withCredentials: true,
  });

export const forgotPassword = (data) =>
  axios({
    url: "/user/requestforgotpw",
    method: "post",
    data,
  });

export const resetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });

export const getUserInfo = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
