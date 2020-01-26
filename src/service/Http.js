import axios from 'axios';

export const http = axios.create({
<<<<<<< HEAD
  baseURL: 'http://192.168.0.100:9005/api/',
=======
  baseURL: 'http://191.190.100.27:9005/api/',
>>>>>>> a87e407ee62f97633648ae5d4dba50054a93fd94
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('user-token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, error => Promise.reject(error));
