import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_USER_SERVICE_URL || 'http://localhost:5000/api/users';

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};


export default { login, register };
