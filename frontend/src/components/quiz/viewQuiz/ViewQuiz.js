import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import Loading from '../../Loading';
import ViewQuizList from './ViewQuizCard';
import { getQuizNoAnswers } from '../../../connections/quizDatabaseService';

const ViewQuizzes = () => {
  const [quizData, setQuizData] = React.useState({});
  const [loading, isLoading] = React.useState(true);

  const params = useParams();

  const getQuizData = async () => {
    const quizId = params.id;
    try {
      const quizResponse = await getQuizNoAnswers(quizId);
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
  } if (quizData) {
    return (
      <ViewQuizList quizData={quizData} />
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default ViewQuizzes;
