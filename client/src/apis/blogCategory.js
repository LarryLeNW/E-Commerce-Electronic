import axios from "config/axios";

export const getBlogCategories = (params) =>
  axios({
    url: "/blogcategory/",
    method: "get",
    params,
  });
