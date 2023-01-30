const User = require('../models/user.model');

exports.login = async (req, res) => {
  const { password, accountNumber } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user o password not exist',
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'User successfully logged in',
    user,
  });
};

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
