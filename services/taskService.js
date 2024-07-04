const Task = require('../models').Task;

const getTasksByUserId = async (userId, limit, offset) => {
  const { count, rows } = await Task.findAndCountAll({
    where: { userId },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  const totalPages = Math.ceil(count / limit);

  return {
    count,
    totalPages,
    tasks: rows,
  };
};

const storeTask = async (title, description, status, userId) => {
  return await Task.create({
    title,
    description,
    status,
    userId
  });
};

const editTask = async (id, title, description, status, userId) => {
  const task = await Task.findOne({
    where: { id, userId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return await task.update({
    title,
    description,
    status
  });
};

const destroyTask = async (id, userId) => {
  const task = await Task.findOne({
    where: { id, userId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  await task.destroy();
};

module.exports = {
  getTasksByUserId,
  storeTask,
  editTask,
  destroyTask
};
