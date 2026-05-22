import axios from 'axios';

// La URL base del backend, por lo general en Spring Boot es el puerto 8080.
// Cambia esto mediante variables de entorno en un futuro (import.meta.env.VITE_API_URL).
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token si existe en Zustand o localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
