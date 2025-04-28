// routes/taskRoutes.js

const express = require('express');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

 router.post('/', createTask);

 router.get('/', getTasks);

 router.delete('/:id', deleteTask);

 router.put('/:id', updateTask);

module.exports = router;
