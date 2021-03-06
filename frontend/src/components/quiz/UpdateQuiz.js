import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateQuiz, getQuizWithAnswers } from '../../connections/quizDatabaseService';
import QuizForm from './quizForm/QuizForm';
import Loading from '../Loading';
import { showError, showSuccess } from '../notifier/notifierSlice';

const UpdateQuiz = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [questionData, setQuestionData] = React.useState([]);
  const [loading, isLoading] = React.useState(true);

  const getQuizData = async () => {
    const quizId = params.id;
    let quizResponse;
    try {
      quizResponse = await getQuizWithAnswers(quizId);
      if (quizResponse && quizResponse.data) {
        const quizData = quizResponse.data.quiz;
        setName(quizData.name);
        setDescription(quizData.description);
        setQuestionData(quizData.questions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const returnQuizData = async () => {
      await getQuizData();
      isLoading(false);
    };
    returnQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizId = params.id;
    let updatedQuiz;
    try {
      updatedQuiz = await updateQuiz(quizId, name, description, questionData);
      if (updatedQuiz) {
        dispatch(showSuccess(`Updated quiz: ${name}`));
        history.push('/');
      } else {
        dispatch(showError('Failed to update quiz'));
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

  if (loading) {
    return (
      <Loading />
    );
  } if (name && description) {
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
        formType='Update Quiz'
      />
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default UpdateQuiz;
