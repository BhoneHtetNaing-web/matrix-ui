import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const register = (email: string, password: string) =>
  axios.post(`${API_URL}?auth/register`, { email, password });

export const login = (email: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { email, password });