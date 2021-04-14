import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {
  Card,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

import Navbar from '../../NavBar';

import { selectRole } from '../../auth/userSlice';

const useStyles = makeStyles(() => ({
  card: {
    marginInline: '20%',
    marginBottom: '20px',
    paddingInline: '5%',
    paddingBlock: '10px',
  },
}));

const ViewQuizListCard = ({
  quizData, showAnswers, toggleShowAnswer,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const role = useSelector(selectRole);

  const goToHome = () => {
    history.push('/');
  };

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
              {quizData.questions.map((question, questionIndex) => (
                <div role='presentation' key={question._id}>
                  <Grid container direction='row' justify='space-between' alignItems='center' spacing={1}>
                    <Grid>
                      <Typography variant='body1'>
                        <li>
                          {question.question}
                        </li>
                      </Typography>
                    </Grid>
                    {role === 'editor' || role === 'viewer' ? (
                      <Grid item>
                        <Button onClick={() => toggleShowAnswer(questionIndex)} color='secondary' size='small'>
                          {showAnswers[questionIndex] ? 'Hide Answer' : 'Show Answer'}
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                  <ol>
                    {question.options.map((option, optionIndex) => (
                      <Typography
                        key={option}
                        variant='body1'
                      >
                        <li type='A' style={showAnswers[questionIndex] && optionIndex === question.correctOption ? { backgroundColor: '#C8FFAB' } : { backgroundColor: 'white' }}>
                          {option}
                        </li>
                      </Typography>
                    ))}
                  </ol>
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
};

ViewQuizListCard.propTypes = {
  quizData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })),
  }).isRequired,
  showAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  toggleShowAnswer: PropTypes.func.isRequired,
};

export default ViewQuizListCard;
