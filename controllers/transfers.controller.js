const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

// funcion para realizar una transferencia y guardarla en la base de datos
exports.transferAmount = async (req, res) => {
  //1.Recibo el monto, el numero de cuenta del recibiendo y el usuario que va a mandar por el body
  const { amount, accountNumber, senderUserId } = req.body;

  //2.Verifico si  existe un numero de cuenta igual a la que pase y al mismo tiempo el usuario recibiente existe a traves de su numero de cuenta
  const userReceiver = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  //3. Si el usuario recibiente no existe mando un error y salgo de la funcion
  if (!userReceiver) {
    return res.status(404).json({
      status: 'error',
      message: 'The user receiver not exist',
    });
  }

  //4. Pongo en una variable el id del usuario recibiente
  const receiverUserId = userReceiver.id;

  //5. A traves del id que recibo, verifiqo si existe un usuario igual con ese id
  const userSend = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });

  //6. Si el usuario que manda no existe mando un error y salgo de la funcion
  if (!userSend) {
    return res.status(404).json({
      status: 'error',
      message: 'The user receiver not exist',
    });
  }

  //7. Si el monto es mayor a lo que tiene la cuenta mando un error y salgo de la funcion
  if (amount > +userSend.amount) {
    return res.status(404).json({
      status: 'error',
      message: 'the insufficient amount in the accountNumber',
    });
  }

  //8. Verifico si el usuario que manda es quien recibe y si es asi mando un error y salgo de la funcion
  if (userReceiver.id == userSend.id) {
    return res.status(404).json({
      status: 'error',
      message: 'you cannot send yourself',
    });
  }

  //9. Pongo en una constante la resta de lo que se manda - los que tiene la cuenta
  const newAmountUserMakeTransfer = userSend.amount - amount;
  //10. Sumo lo que recibo con lo que tiene en su cuenta el usuario reciente
  const newAmountUserReceiverTransfer = userReceiver.amount + amount;

  //11. actualizo en la base de datos la resta del usuario enviante, y la suma del usuario reciente
  await userSend.update({
    amount: newAmountUserMakeTransfer,
  });
  await userReceiver.update({
    amount: newAmountUserReceiverTransfer,
  });

  //13. Creo en la tabla de la base de datos un nuevo registro con la transacion  (el Monto, el id del usuario mandante y el id del usuario recibiente)
  const transfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  //13. Mando una repuesta de la transacion (el Monto, el id del usuario mandante y el id del usuario recibiente)
  res.status(201).json({
    status: 'success',
    message: 'The transfer was created successfully',
    transfer,
  });
};
