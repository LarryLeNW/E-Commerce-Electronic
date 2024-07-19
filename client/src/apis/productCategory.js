import axios from "config/axios";

export const getProductCategories = (params) =>
  axios({
    url: "/prodcategory/",
    method: "get",
    params,
  });

export const createCategory = (data) =>
  axios({
    url: "/prodcategory/",
    method: "post",
    data,
  });

export const updateCategory = (cid, data) =>
  axios({
    url: "/prodcategory/" + cid,
    method: "put",
    data,
  });

export const deleteCategory = (cid) =>
  axios({
    url: "/prodcategory/" + cid,
    method: "delete",
  });
