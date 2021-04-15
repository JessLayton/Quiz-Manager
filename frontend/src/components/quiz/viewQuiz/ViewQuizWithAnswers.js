import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Loading from '../../Loading';
import ViewQuizList from './ViewQuizCard';
import { getQuizWithAnswers } from '../../../connections/quizDatabaseService';

const ViewQuizzes = () => {
  const params = useParams();

  const [quizData, setQuizData] = React.useState({});
  const [loading, isLoading] = React.useState(true);
  const [showAnswers, setShowAnswers] = React.useState([]);

  const getQuizData = async () => {
    const quizId = params.id;
    const showAnswersArr = [];
    try {
      const quizResponse = await getQuizWithAnswers(quizId);
      if (quizResponse && quizResponse.data) {
        setQuizData(quizResponse.data.quiz);
        quizResponse.data.quiz.questions.forEach(() => {
          showAnswersArr.push(false);
        });
        setShowAnswers(showAnswersArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkQuizData = async () => {
      await getQuizData();
      isLoading(false);
    };
    checkQuizData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleShowAnswer = (questionIndex) => {
    const showAnswersArr = [...showAnswers];
    showAnswersArr[questionIndex] = !showAnswersArr[questionIndex];
    setShowAnswers(showAnswersArr);
  };

  if (loading) {
    return (
      <Loading />
    );
  } if (quizData) {
    return (
      <ViewQuizList quizData={quizData} showAnswers={showAnswers} toggleShowAnswer={toggleShowAnswer} />
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default ViewQuizzes;
