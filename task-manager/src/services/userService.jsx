import axios from 'axios';
console.log('User API URL:', import.meta.env.VITE_REACT_APP_USER_SERVICE_URL);
const API_URL = import.meta.env.VITE_REACT_APP_USER_SERVICE_URL || 'http://localhost:5000/api/users';
console.log("ENV:", import.meta.env);


const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true, // ✅ Important for cookies/auth
  });
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    withCredentials: true, // ✅ Also for secure registration
  });
  return response.data;
};

export default { login, register };
