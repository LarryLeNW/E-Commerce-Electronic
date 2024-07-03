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
