import axios from 'axios';

const API_URL = import.meta.env.VITE_TASK_SERVICE_URL || 'http://localhost:5001';

const getTasks = async (userId) => {
  const response = await axios.get(`${API_URL}/api/tasks?userId=${userId}`);
  console.log('erferfc', response.data);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/api/tasks`, taskData);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`);
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, taskData);
  return response.data;
};

export default { getTasks, createTask, deleteTask, updateTask };
