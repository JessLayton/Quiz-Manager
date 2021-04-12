import {
  post, get, put, remove,
} from './databaseConnector';
import getHeaders from './getHeaders';

const getAllQuizzes = async () => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await get('/quizzes/getAllQuizzes', getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const getQuiz = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/getQuiz', { id }, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const getQuestions = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/getQuestions', { id }, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const assessorGetQuiz = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/assessorGetQuiz', { id }, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const markQuiz = async (id, answers) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/markQuiz', { id, answers }, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const createNewQuiz = async (name, description, questions) => {
  const quizData = { name, description, questions };
  let response;
  try {
    response = await post('/quizzes/createQuiz', quizData, getHeaders());
  } catch (err) {
    console.error(err);
  }
  return response;
};

const deleteQuiz = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await remove(`/quizzes/deleteQuiz/${id}`, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const updateQuiz = async (id, name, description, questions) => {
  const quizData = {
    name, description, questions,
  };
  let response;
  try {
    response = await put(`/quizzes/updateQuiz/${id}`, quizData, getHeaders());
  } catch (err) {
    console.error(err);
  }
  return response;
};

export {
  getAllQuizzes, getQuiz, getQuestions, assessorGetQuiz, markQuiz, createNewQuiz, deleteQuiz, updateQuiz,
};
