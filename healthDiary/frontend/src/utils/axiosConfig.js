// src/utils/axiosConfig.js

import axios from 'axios';

// Cria uma instância do Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Altere para a URL do seu backend se necessário
});

// Interceptador de requisições para adicionar o token no header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Para Token Authentication do DRF, use 'Token <token>'
      config.headers.Authorization = `Token ${token}`;
      // Se estiver usando JWT, use 'Bearer <token>'
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;