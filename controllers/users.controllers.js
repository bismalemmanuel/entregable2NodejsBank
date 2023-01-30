const User = require('../models/user.model');

// Funcion para logear a un usuario
exports.login = async (req, res) => {
  //1. Recibo de req.body la clave y numero de cuenta
  const { password, accountNumber } = req.body;

  //2.Busco el usuario en mi base de datos
  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: true,
    },
  });
  //3.Verifico y se encuentra, sino mando un error
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user o password not exist',
    });
  }
  //3.Si se encontro, mando un mensaje de logeado
  return res.status(200).json({
    status: 'success',
    message: 'User successfully logged in',
    user,
  });
};

// Funcion para registrar a un usuario
exports.createUser = async (req, res) => {
  const { name, password } = req.body;

  const accountNumber = Math.floor(Math.random() * 1000000);
  const amount = 1000;

  const newUser = await User.create({
    name: name.toLowerCase(),
    accountNumber,
    password,
    amount,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user was created successfully',
    newUser,
  });
};
