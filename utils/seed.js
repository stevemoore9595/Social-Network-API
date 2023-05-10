const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [
    {
      username: "Jamie",
      email: "Jamie@gmail.com"
    },
    {
      username: "Stephen",
      email: "Stephen@gmail.com"
    }
  ];

    await User.collection.insertMany(users);

  console.table(users);
  console.info('Seeding complete!');
  process.exit(0);
});
