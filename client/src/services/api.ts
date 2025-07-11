// API service for all backend requests
import axios from 'axios';

export const API_BASE_URL = 'https://notest-foym.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default api; 