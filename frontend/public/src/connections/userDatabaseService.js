import { post, get } from './databaseConnector';
import getHeaders from './getHeaders';

const register = async (email, username, password, confirmPassword) => {
  let response;
  const newUserData = {
    email, username, password, confirmPassword,
  };
  try {
    response = await post('/users/register', newUserData);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const login = async (username, password) => {
  const loginData = { username, password };
  let response;
  try {
    response = await post('/users/login', loginData);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const checkToken = async () => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await get('/users/tokenIsValid', getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const getUsers = async () => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await get('/users/allUsers', getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

export {
  register, login, getUsers, checkToken,
};
