const { registerUser, loginUser } = require('../../application/services/user_service');

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body); 
    console.log('user',user)
    res.status(200).json({
      message: 'Autenticación exitosa',
      user, 
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
