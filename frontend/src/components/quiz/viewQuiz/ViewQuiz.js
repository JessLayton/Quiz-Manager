import React, { useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import {
  Card,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

import Loading from '../../Loading';
import Navbar from '../../NavBar';
import { getQuizNoAnswers } from '../../../connections/quizDatabaseService';

const useStyles = makeStyles(() => ({
  card: {
    marginInline: '20%',
    marginBottom: '20px',
    paddingInline: '5%',
    paddingBlock: '10px',
  },
}));

const ViewQuizzes = () => {
  const history = useHistory();
  const classes = useStyles();

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

  const goToHome = () => {
    history.push('/');
  };

  if (loading) {
    return (
      <Loading />
    );
  } if (quizData) {
    return (
      <>
        <Navbar pageHeading='View Quiz' />
        <Card className={classes.card}>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <Typography variant='h4'>
                {quizData.name}
              </Typography>
              <Typography variant='h6'>
                {quizData.description}
              </Typography>
              <ol>
                {quizData.questions.map((question) => (
                  <div role='presentation' key={question._id}>
                    <Typography variant='body1'>
                      <li>
                        {question.question}
                      </li>
                    </Typography>
                    {question.options.map((option) => (
                      <Typography key={option} variant='body1'>
                        {option}
                      </Typography>
                    ))}
                  </div>
                ))}
              </ol>
            </Grid>
            <Grid item>
              <Button onClick={goToHome} variant='contained' color='secondary' size='small'>
                Back to Quizzes
              </Button>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default ViewQuizzes;
