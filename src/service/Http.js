import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://191.190.100.27:9005/api/',
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('user-token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, error => Promise.reject(error));
