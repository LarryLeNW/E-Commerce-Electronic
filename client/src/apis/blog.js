import axios from "config/axios";

export const createBlog = (data) =>
  axios({
    url: "/blog/",
    method: "post",
    data,
  });

export const reactBlog = (id, type) =>
  axios({
    url: `/blog/react/${id}/${type}`,
    method: "post",
  });

export const getBlogs = (params) =>
  axios({
    url: "/blog/",
    method: "get",
    params,
  });

export const getBlog = (id) =>
  axios({
    url: "/blog/" + id,
    method: "get",
  });

export const deleteBlog = (id) =>
  axios({
    url: "/blog/" + id,
    method: "delete",
  });

export const updateBlog = (id, data) =>
  axios({
    url: "/blog/" + id,
    method: "put",
    data,
  });
