import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import QuizForm from './quizForm/QuizForm';
import { createNewQuiz } from '../../connections/quizDatabaseService';
import { showSuccess, showError } from '../notifier/notifierSlice';

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [questionData, setQuestionData] = React.useState([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createQuiz = await createNewQuiz(name, description, questionData);
      if (createQuiz && createQuiz.data && createQuiz.data.quiz) {
        dispatch(showSuccess(`Created quiz: ${name}`));
        history.push('/');
      } else {
        dispatch(showError('Failed to create quiz'));
      }
    } catch (error) {
      console.error(error);
      dispatch(showError(error.message));
    }
  };

  const checkCorrectOption = (event, index) => {
    const data = [...questionData];
    data[index].correctOption = parseInt(event.target.value, 10);
    setQuestionData(data);
  };

  return (
    <QuizForm
      handleSubmit={handleSubmit}
      questionData={questionData}
      setQuestionData={setQuestionData}
      name={name}
      updateQuizName={setName}
      description={description}
      updateQuizDescription={setDescription}
      checkCorrectOption={checkCorrectOption}
    />
  );
};

export default CreateQuiz;
