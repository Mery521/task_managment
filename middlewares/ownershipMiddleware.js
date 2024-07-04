const Task = require('../models').Task;

const checkTaskOwnership = async (req, res, next) => {
  const { id } = req.params;
  
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) {
    return res.status(404).send('Task not found or does not belong to the user');
  }
  
  next();
};

module.exports = checkTaskOwnership;

