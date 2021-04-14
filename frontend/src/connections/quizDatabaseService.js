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

const getQuizWithAnswers = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/getQuizWithAnswers', { id }, getHeaders());
    } catch (err) {
      console.error(err);
    }
  }
  return response;
};

const getQuizNoAnswers = async (id) => {
  let response;
  if (localStorage.getItem('auth-token')) {
    try {
      response = await post('/quizzes/getQuizNoAnswers', { id }, getHeaders());
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
    throw new Error(err.message);
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
  getAllQuizzes, getQuizWithAnswers, getQuizNoAnswers, createNewQuiz, deleteQuiz, updateQuiz,
};
