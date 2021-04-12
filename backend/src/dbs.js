const mongoose = require('mongoose');

const userDb = mongoose.createConnection(
  process.env.MONGODB_USERS_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.error(err);
      throw (err);
    }
    console.log('Connected to User MongoDB');
  },
);

const quizDb = mongoose.createConnection(
  process.env.MONGODB_QUIZZES_CONNECTION_STRING, {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.error(err);
      throw (err);
    }
    console.log('Connected to Quiz MongoDB');
  },
);

module.exports = { userDb, quizDb };
