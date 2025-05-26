const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
});

module.exports = router;
