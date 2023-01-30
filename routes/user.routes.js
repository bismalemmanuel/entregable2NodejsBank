const { Router } = require('express');

const { createUser, login } = require('../controllers/users.controllers');

const router = Router();

router.get('/login', login);

router.post('/setup', createUser);

module.exports = {
  usersRouter: router,
};
