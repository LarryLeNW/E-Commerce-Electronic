import axios from "config/axios";

export const getBlogCategories = (params) =>
  axios({
    url: "/blogcategory/",
    method: "get",
    params,
  });

export const createBlogCategories = (data) =>
  axios({
    url: "/blogcategory/",
    method: "post",
    data,
  });

export const deleteBlogCategories = (id) =>
  axios({
    url: "/blogcategory/" + id,
    method: "delete",
  });

export const updateBlogCategories = (id, data) =>
  axios({
    url: "/blogcategory/" + id,
    method: "put",
    data,
  });
