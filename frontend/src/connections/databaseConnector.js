import Axios from 'axios';

const getLocation = (path) => `http://localhost:5000${path}`;

const post = async (path, body, headers = {}) => {
  const response = await Axios.post(getLocation(path), body, headers).catch((err) => {
    console.error(err);
    throw new Error(err.response.data.msg);
  });

  return response;
};

const get = async (path, headers = {}) => {
  let response;
  try {
    response = await Axios.get(getLocation(path), headers);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const put = async (path, body, headers) => {
  let response;
  try {
    response = await Axios.put(getLocation(path), body, headers);
  } catch (err) {
    console.error(err);
  }
  return response;
};

const remove = async (path, headers) => {
  let response;
  try {
    response = await Axios.delete(getLocation(path), headers);
  } catch (err) {
    console.error(err);
  }
  return response;
};

export {
  post, get, put, remove,
};
