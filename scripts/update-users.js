// scripts/update-users.js
import dbConnect from '../src/lib/dbConnect';
import User from '../src/models/User';

async function updateUsers() {
  await dbConnect();

  try {
    const result = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'regular' } }
    );

    console.log(`Updated ${result.nModified} users.`);
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    // Disconnect from the database
    const mongoose = require('mongoose');
    await mongoose.disconnect();
  }
}

updateUsers();
