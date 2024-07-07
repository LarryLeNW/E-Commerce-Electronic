import axios from "config/axios";

export const getUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
