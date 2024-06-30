import axios from "config/axios";

export const register = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const login = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
