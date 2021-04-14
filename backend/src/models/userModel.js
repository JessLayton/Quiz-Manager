const mongoose = require('mongoose');
const { userDb } = require('../dbs');

const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordCheck = /^((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,})$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (isEmail) => emailCheck.test(isEmail),
      message: (props) => `${props.value} is not a valid email`,
    },
    required: [true, 'Email is required field'],
  },
  password: {
    type: String,
    validate: {
      validator: (isPassword) => passwordCheck.test(isPassword),
      message: 'Invalid password - password must be 8 characters including uppercase, special and alphanumeric characters',
    },
    required: [true, 'Password is required field'],
    minlength: 8,
    maxLength: 100,
  },
  username: {
    type: String, maxLength: 25, minlength: 5, unique: true,
  },
  role: {
    type: String,
    default: 'restricted',
  },
});

const User = userDb.model('user', userSchema);

module.exports = User;
