import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const nuevoToken = response.headers['x-token-renewed'];

    if (nuevoToken) {
      localStorage.setItem('token', nuevoToken);
    }

    return response;
  },
  (error) => {
    const url = error.config.url; 
    const status = error.response?.status;

    if (status === 401 && url !== '/auth/login') {
      window.dispatchEvent(new Event("session-expired"));
    }

    return Promise.reject(error);
  }
);

export default api;