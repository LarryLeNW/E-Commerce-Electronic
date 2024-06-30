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
  });

export const forgotPassword = (data) =>
  axios({
    url: "/user/requestforgotpw",
    method: "post",
    data,
  });

export const resetpassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
