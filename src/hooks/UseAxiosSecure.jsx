import axios from 'axios';
import React from 'react';
const UseAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: 'https://twelveth-assignment-server.vercel.app',
  });

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    console.log(localStorage.getItem("access-token"))

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosSecure;
};

export default UseAxiosSecure;
