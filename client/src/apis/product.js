import axios from "config/axios";

export const getProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });

export const getProduct = (id) => {
  return axios({
    url: "/product/" + id,
    method: "get",
  });
};

export const createProduct = (data) => {
  return axios({
    url: "/product/",
    method: "post",
    data,
  });
};

export const updateProduct = (pid, data) => {
  return axios({
    url: "/product/" + pid,
    method: "put",
    data,
  });
};

export const createVariant = (pid, data) => {
  return axios({
    url: "/product/" + pid + "/variant",
    method: "put",
    data,
  });
};

export const deleteVariant = (pid, vid) => {
  return axios({
    url: "/product/" + pid + "/variant/" + vid,
    method: "delete",
  });
};

export const ratings = (data) => {
  return axios({
    url: "/review/",
    method: "put",
    data,
  });
};

export const getReview = (params) => {
  return axios({
    url: "/review",
    method: "get",
    params,
  });
};

export const deleteProduct = (pid) => {
  return axios({
    url: "/product/" + pid,
    method: "delete",
  });
};
