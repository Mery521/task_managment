const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const createTaskValidator = require('../validators/tasks/createTaskValidator');
const updateTaskValidator = require('../validators/tasks/updateTaskValidator');
const paginationValidator = require('../validators/tasks/paginationValidator');
const checkTaskOwnership = require('../middlewares/ownershipMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.get('/tasks', authenticateToken, paginationValidator, getTasks);
router.post('/task', authenticateToken, createTaskValidator, createTask);
router.put('/task/:id', authenticateToken, checkTaskOwnership, updateTaskValidator, updateTask);
router.delete('/task/:id', authenticateToken, checkTaskOwnership, deleteTask);

module.exports = router;
