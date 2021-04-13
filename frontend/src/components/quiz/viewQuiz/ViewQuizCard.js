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
  quizData, showAnswers, toggleShowAnswers,
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
              {quizData.questions.map((question) => (
                <div role='presentation' key={question._id}>
                  <Typography variant='body1'>
                    <li>
                      {question.question}
                    </li>
                  </Typography>
                  <ol>
                    {question.options.map((option, index) => (
                      <Typography
                        key={option}
                        variant='body1'
                        style={showAnswers && index === question.correctOption ? { backgroundColor: '#C8FFAB' } : { backgroundColor: 'white' }}
                      >
                        <li type='A'>
                          {option}
                        </li>
                      </Typography>
                    ))}
                  </ol>
                </div>
              ))}
            </ol>
          </Grid>
          {role === 'editor' || role === 'viewer' ? (
            <Grid item>
              <Button onClick={toggleShowAnswers} variant='contained' color='secondary' size='small'>
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </Button>
            </Grid>
          ) : null}
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
  showAnswers: PropTypes.bool,
  toggleShowAnswers: PropTypes.func,
};

ViewQuizListCard.defaultProps = {
  showAnswers: false,
  toggleShowAnswers: null,
};

export default ViewQuizListCard;
