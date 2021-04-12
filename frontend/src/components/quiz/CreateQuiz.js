import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from '../NavBar';
import QuizForm from './quizForm/QuizForm';
import { createNewQuiz } from '../../connections/quizDatabaseService';
import { showSuccess, showError } from '../notifier/notifierSlice';

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [questionData, setQuestionData] = React.useState([{ question: '', options: ['', '', '', ''], correctOption: 1 }]);
  const [correctOption, setCorrectOption] = React.useState(['1']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createQuiz = await createNewQuiz(name, description, questionData);
      if (createQuiz) {
        dispatch(showSuccess(`Created quiz: ${name}`));
        history.push('/');
      }
      // } else {
      //   console.log('in try');
      //   dispatch(showError('Failed to create quiz A'));
      // }
    } catch (error) {
      console.error(error);
      console.log('in catch');
      dispatch(showError('Failed to create quiz B'));
    }
  };

  const addQuestion = () => {
    setQuestionData([...questionData, { question: '', options: ['', '', '', ''], correctOption: 1 }]);
    setCorrectOption([...correctOption, '1']);
  };

  const removeQuestion = (index) => {
    const deletedQuestion = [...questionData];
    deletedQuestion.splice(index, 1);
    setQuestionData(deletedQuestion);
    const deletedOption = [...correctOption];
    deletedOption.splice(index, 1);
    setCorrectOption(deletedOption);
  };

  const checkCorrectOption = (event, index) => {
    const options = [...correctOption];
    options[index] = event.target.value;
    setCorrectOption(options);
    const data = [...questionData];
    data[index].correctOption = parseInt(event.target.value, 10);
    setQuestionData(data);
  };

  return (
    <>
      <NavBar pageHeading='Create Quiz' />
      <QuizForm
        handleSubmit={handleSubmit}
        questionData={questionData}
        setQuestionData={setQuestionData}
        name={name}
        updateQuizName={setName}
        description={description}
        updateQuizDescription={setDescription}
        correctOption={correctOption}
        checkCorrectOption={checkCorrectOption}
        addQuestion={addQuestion}
        removeQuestion={removeQuestion}
        formType='Create Quiz'
      />
    </>
  );
};

export default CreateQuiz;
