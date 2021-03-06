import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.API_URL,
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('user-token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, (error) => {
  console.log(error);
});
