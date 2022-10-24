import axios from "axios";
const VUE_APP_HOST_HTTP = process.env.VUE_APP_HOST_HTTP;

const http = axios.create({
  baseURL: VUE_APP_HOST_HTTP,
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
