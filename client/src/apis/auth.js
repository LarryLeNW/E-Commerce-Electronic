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
