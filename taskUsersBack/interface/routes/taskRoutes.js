const express = require('express');
const router = express.Router();
const taskController = require('../../application/services/task_service');
const authMiddleware = require('../../interface/middleware/authMiddleware');


router.post('/', authMiddleware, async (req, res) => {
  try {
    const task = await taskController.createTask({ ...req.body, userId: req.user.id });
    res.status(201).json({ message: 'Tarea creada correctamente.', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await taskController.updateTask(req.params.id, req.body);
    res.json({ message: 'Tarea actualizada correctamente.', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await taskController.deleteTask(req.params.id);
    res.json({ message: 'Tarea eliminada correctamente.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const tasks = await taskController.getTasksByUser(req.params.userId);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
