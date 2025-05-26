const {
  createTask,
  updateTask,
  deleteTask,
  getTasksByUser
} = require('../../application/services/task_service');

const create = async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({ message: 'Tarea creada correctamente.', task });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json({ message: 'Tarea actualizada correctamente.', task });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: 'Tarea eliminada correctamente.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const listByUser = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.params.userId);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor.', error: error.message });
  }
};

module.exports = {
  create,
  update,
  remove,
  listByUser
};
