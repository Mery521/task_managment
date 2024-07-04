const {
    getTasksByUserId,
    storeTask,
    editTask,
    destroyTask
  } = require('../services/taskService');
  const { getPagination } = require('../utils/pagination');
  
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit, offset, page } = getPagination(req.query);

    const { count, totalPages, tasks } = await getTasksByUserId(userId, limit, offset);

    return res.json({
      totalTasks: count,
      totalPages,
      currentPage: page,
      tasks,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
  
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = await storeTask(title, description, status, req.user.id);

    return res.json(newTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await editTask(id, title, description, status, req.user.id);

    return res.json(updatedTask);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    await destroyTask(id, req.user.id);
    return res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
  