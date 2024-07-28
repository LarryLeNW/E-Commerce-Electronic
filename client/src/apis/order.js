import axios from "config/axios";

export const createOrder = (data) =>
  axios({
    url: "/order/",
    method: "post",
    data,
  });

export const getOrders = () =>
  axios({
    url: "/order/",
    method: "get",
  });

export const getOrdersByAdmin = (params) =>
  axios({
    url: "/order/admin/",
    method: "get",
    params,
  });

export const getOrder = (oid) =>
  axios({
    url: "/order/" + oid,
    method: "get",
  });

export const deleteOrder = (oid) =>
  axios({
    url: "/order/" + oid,
    method: "delete",
  });
