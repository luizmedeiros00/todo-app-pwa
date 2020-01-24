import axios from 'axios';

export const http = axios.create({
  // baseURL: `${process.env.VUE_APP_HOST}`
  baseURL: 'http://191.190.100.27:9005/api/',
  // baseURL: 'http://192.168.0.100:9005/api/',
  // baseURL: 'http://192.168.1.224:8000/api/',
});

// http.interceptors.request.use((config) => {
//   // console.log(response)
//   const token = window.localStorage.getItem('user-token');

//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }

//   return config;
// }, error => Promise.reject(error));
