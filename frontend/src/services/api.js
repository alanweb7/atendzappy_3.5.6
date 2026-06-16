import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Adicionar timestamp em requisições para evitar cache
api.interceptors.request.use(config => {
  config.headers['X-Requested-At'] = Date.now();
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  return config;
});

export const openApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// Mesmo para openApi
openApi.interceptors.request.use(config => {
  config.headers['X-Requested-At'] = Date.now();
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  return config;
});

export default api;
