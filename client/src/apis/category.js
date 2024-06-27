import axios from "../config/axios";

export const getCategories = () =>
  axios({
    url: "/prodcategory/",
    method: "get",
  });
