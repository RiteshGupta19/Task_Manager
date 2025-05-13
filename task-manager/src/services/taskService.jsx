import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_TASK_SERVICE_URL || 'http://localhost:5001';

const getTasks = async (userId) => {
  const response = await axios.get(`${API_URL}/api/tasks?userId=${userId}`, {
    withCredentials: true, // ✅ Add this
  });
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
    withCredentials: true, // ✅
  });
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
    withCredentials: true, // ✅
  });
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, taskData, {
    withCredentials: true, // ✅
  });
  return response.data;
};

export default { getTasks, createTask, deleteTask, updateTask };
