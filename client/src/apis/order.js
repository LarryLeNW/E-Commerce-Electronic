import axios from "config/axios";

export const createOrder = (data) =>
  axios({
    url: "/order/",
    method: "post",
    data,
  });

export const getOrder = () =>
  axios({
    url: "/order/",
    method: "get",
  });
