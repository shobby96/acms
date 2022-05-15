import axios from "axios";
export default {
  get: (url, headers = null) =>
    axios.request({
      method: "get",
      url: url,
      headers: headers,
    }),
  delete: (url, headers = null) =>
    axios.request({
      method: "delete",
      url: url,
      headers: headers,
    }),
  add: (url, comment, headers = null) =>
    axios.request({
      method: "post",
      data: comment,
      url: url,
      headers: headers,
    }),
  edit: (url, comment, headers = null) =>
    axios.request({
      method: "put",
      data: comment,
      url: url,
      headers: headers,
    }),
};
