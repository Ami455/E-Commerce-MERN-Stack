import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_HOST,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}) 
export const formDataApi = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_HOST,
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}) 

