import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1",
});


export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

