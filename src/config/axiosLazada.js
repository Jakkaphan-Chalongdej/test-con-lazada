const axios = require("axios");

export default axios.create({
  baseURL: "http://localhost:3006/api/",
  headers: {
    Accept: "application/json",
  },
});
