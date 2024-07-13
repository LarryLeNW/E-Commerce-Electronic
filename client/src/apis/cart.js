import axios from "config/axios";

export const updateCart = (data) => {
  return axios({
    url: "/cart/",
    method: "put",
    data,
  });
};

export const removeCart = (pid) => {
  return axios({
    url: "/cart/" + pid,
    method: "delete",
  });
};
