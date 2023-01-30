const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.transferAmount = async (req, res) => {
  const { amount, accountNumber, senderUserId } = req.body;

  const userReceiver = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  if (!userReceiver) {
    return res.status(404).json({
      status: 'error',
      message: 'The user receiver not exist',
    });
  }

  const receiverUserId = userReceiver.id;

  const userSend = await User.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });

  if (!userSend) {
    return res.status(404).json({
      status: 'error',
      message: 'The user receiver not exist',
    });
  }

  if (amount > +userSend.amount) {
    return res.status(404).json({
      status: 'error',
      message: 'the insufficient amount in the accountNumber',
    });
  }

  if (userReceiver.id == userSend.id) {
    return res.status(404).json({
      status: 'error',
      message: 'you cannot send yourself',
    });
  }
  const newAmountUserMakeTransfer = userSend.amount - amount;
  const newAmountUserReceiverTransfer = userReceiver.amount + amount;

  await userSend.update({
    amount: newAmountUserMakeTransfer,
  });
  await userReceiver.update({
    amount: newAmountUserReceiverTransfer,
  });
  const transfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The transfer was created successfully',
    transfer,
  });
};
