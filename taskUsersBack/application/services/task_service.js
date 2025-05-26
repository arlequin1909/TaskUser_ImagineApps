const Task = require('../../domain/entities/task');

const createTask = async (data) => {
  try {
    const { userId, title } = data;
    if (!userId || !title) {
      throw new Error('userId y title son obligatorios.');
    }

    const task = new Task(data);
    await task.save();
    return task;
  } catch (error) {
    throw new Error(`Error al crear la tarea: ${error.message}`);
  }
};

const updateTask = async (id, data) => {
  try {
    if (!id) throw new Error('ID de la tarea es requerido.');

    const task = await Task.findByIdAndUpdate(id, data, { new: true });
    if (!task) throw new Error('Tarea no encontrada.');

    return task;
  } catch (error) {
    throw new Error(`Error al actualizar la tarea: ${error.message}`);
  }
};

const deleteTask = async (id) => {
  try {
    if (!id) throw new Error('ID de la tarea es requerido.');

    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error('Tarea no encontrada.');

    return task;
  } catch (error) {
    throw new Error(`Error al eliminar la tarea: ${error.message}`);
  }
};

const getTasksByUser = async (userId) => {
  try {
    if (!userId) throw new Error('ID del usuario es requerido.');

    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    throw new Error(`Error al obtener las tareas: ${error.message}`);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasksByUser
};
