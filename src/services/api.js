import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const cadastrarUsuario = (data) => api.post('/auth/cadastro', data);
export const loginUsuario = (data) => api.post('/auth/login', data);
export const loginInstituicao = (data) => api.post('/auth/login-instituicao', data);

// Relatos
export const criarRelato = (data) => api.post('/relatos', data);
export const listarRelatos = () => api.get('/relatos');
export const getEstatisticas = () => api.get('/relatos/estatisticas');

export default api;