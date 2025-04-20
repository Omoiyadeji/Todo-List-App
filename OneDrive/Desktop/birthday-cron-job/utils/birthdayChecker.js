const cron = require('node-cron');
const User = require('../models/User');
const { sendBirthdayEmail } = require('./emailService');

// Run every day at 7 AM
cron.schedule('0 7 * * *', async () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  try {
    const birthdayUsers = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, month] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, day] }
        ]
      }
    });

    for (const user of birthdayUsers) {
      await sendBirthdayEmail(user);
    }
  } catch (error) {
    console.error('Error checking birthdays:', error);
  }
});