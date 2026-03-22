import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRecords = async () => {
  const response = await API.get("/records/");
  return response.data;
};

export const createRecord = async (payload) => {
  const response = await API.post("/records/", payload);
  return response.data;
};

export const sendRecordsEmail = async (payload) => {
  const response = await API.post("/records/send-email", payload);
  return response.data;
};