import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://192.168.0.100:9005/api/',
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('user-token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, error => Promise.reject(error));
