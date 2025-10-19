import axios from "axios";

<<<<<<< HEAD
const API_BASE = "https://ez-rent-server-side-seven.vercel.app";
=======
const API_BASE = "https://ez-rent-server-side.vercel.app/";
>>>>>>> 4746d7720caef06d86f0775b65cff25679fa5525

export const fetchExperiences = (page = 1, limit = 20) =>
  axios
    .get(`${API_BASE}/api/experiences?page=${page}&limit=${limit}`)
    .then((r) => r.data);

export const createExperience = (payload) =>
  axios.post(`${API_BASE}/api/experiences`, payload).then((r) => r.data);

export const rateExperience = (id, payload) =>
  axios
    .post(`${API_BASE}/api/experiences/${id}/rate`, payload)
    .then((r) => r.data);

export const deleteExperience = (id, payload) =>
  axios
    .delete(`${API_BASE}/api/experiences/${id}`, { data: payload })
    .then((r) => r.data);
