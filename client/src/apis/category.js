import axios from "config/axios";

export const getCategories = (params) =>
  axios({
    url: "/prodcategory/",
    method: "get",
    params,
  });
