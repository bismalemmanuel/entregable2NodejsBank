const { Router } = require('express');
const { transferAmount } = require('../controllers/transfers.controller');

const router = Router();

//IMPORTANTE ESTOS COMENTARIOS SON MERAMENTE EDUCATIVOS

router.post('/', transferAmount);

module.exports = {
  transferRouter: router,
};
