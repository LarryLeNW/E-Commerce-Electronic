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

export const changeAvatar = (data) =>
  axios({
    url: "/user/changeAvatar/",
    method: "put",
    data,
  });

export const deleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });

export const createUser = async (data) => {
  axios({
    url: "/user/mock",
    method: "post",
    data,
  });
};
