import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mocki.io/v1",
});

export default axiosInstance;