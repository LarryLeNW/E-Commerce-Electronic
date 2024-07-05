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

export const ratings = (data) => {
  return axios({
    url: "/product/ratings/",
    method: "put",
    data,
  });
};
