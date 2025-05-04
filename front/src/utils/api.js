import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formDataApi = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_HOST,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Attach token dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

formDataApi.interceptors.response.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// import axios from "axios";

// export const api = axios.create({
//     baseURL: import.meta.env.VITE_LOCAL_HOST,
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: Bearer ${localStorage.getItem("token")},
//     },
// })
// export const formDataApi = axios.create({
//     baseURL: import.meta.env.VITE_LOCAL_HOST,
//     headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: Bearer ${localStorage.getItem("token")},
//     },
// })
