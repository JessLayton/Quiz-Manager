import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Navbar from '../../NavBar';
import { getQuiz } from '../../../connections/quizDatabaseService';
import QuizCard from './QuizCard';
import Loading from '../../Loading';

const Quiz = () => {
  const [quizData, setQuizData] = React.useState({});
  const [loading, isLoading] = React.useState(true);

  const params = useParams();

  const getQuizData = async () => {
    const quizId = params.id;
    let quizResponse;
    try {
      quizResponse = await getQuiz(quizId);
      if (quizResponse && quizResponse.data) {
        setQuizData(quizResponse.data.quiz);
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

  if (loading) {
    return (
      <Loading />
    );
  } if (quizData && Object.keys(quizData).length > 0 && quizData.name) {
    return (
      <>
        <Navbar pageHeading={quizData.name} />
        <QuizCard questions={quizData.questions} />
      </>
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default Quiz;
