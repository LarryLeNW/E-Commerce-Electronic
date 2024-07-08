import axios from "config/axios";

export const getUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const updateUser = (uid, data) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });

export const deleteUser = (uid, data) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });
