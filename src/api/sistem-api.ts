import axios from "axios";

const sistemApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default sistemApi;
