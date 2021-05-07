const axios = require("axios");

export default axios.create({
  baseURL: "http://localhost:3003/api/",
  headers: {
    Accept: "application/json",
  },
});
