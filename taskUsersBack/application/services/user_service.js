const bcrypt = require('bcrypt');
const User = require('../../domain/entities/user');
const jwt = require('jsonwebtoken');

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  if (!isEmailValid(email)) {
    throw new Error('El correo no tiene un formato válido.');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El correo ya está registrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Correo y contraseña son obligatorios.');
  }

  const user = await User.findOne({ email });
  if (!user || !(await comparePasswords(password, user.password))) {
    throw new Error('Credenciales inválidas.');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    user: {
      id: user._id, 
      email: user.email
    },
    token
  };
};


module.exports = {
  registerUser,
  loginUser
};
