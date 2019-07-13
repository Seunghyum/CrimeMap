import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? "https://crime-map.com/v1"
      : "http://localhost:3000/v1",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  validateStatus: status => {
    if (status >= 200 && status < 300) return true;
    if (status === 304) return true;
    if (status === 401) return true;
    return false;
  }
});
