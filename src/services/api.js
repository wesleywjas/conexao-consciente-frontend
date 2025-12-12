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

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('instituicao');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth - Usuários
export const cadastrarUsuario = (data) => api.post('/auth/cadastro', data);
export const loginUsuario = (data) => api.post('/auth/login', data);

// Auth - Instituições
export const loginInstituicao = (data) => api.post('/auth/login-instituicao', data);
export const cadastrarInstituicao = (data) => api.post('/instituicoes/cadastro', data);
export const getPerfilInstituicao = () => api.get('/instituicoes/perfil');

// Relatos
export const criarRelato = (data) => api.post('/relatos', data);
export const listarRelatos = () => api.get('/relatos');
export const getEstatisticas = () => api.get('/relatos/estatisticas');

// Notícias
export const criarNoticia = (data) => api.post('/noticias', data);
export const listarNoticias = () => api.get('/noticias');
export const getNoticia = (id) => api.get(`/noticias/${id}`);
export const deletarNoticia = (id) => api.delete(`/noticias/${id}`);

export default api;