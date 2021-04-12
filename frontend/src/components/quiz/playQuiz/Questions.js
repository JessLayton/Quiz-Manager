import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  optionText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Questions = ({
  questionData, tabNumber, answers, selectAnswer,
}) => {
  const classes = useStyles();

  return (
    <>
      {questionData.map((question, index) => (
        <div
          hidden={tabNumber !== index}
          key={question._id}
        >
          {tabNumber === index && (
          <Grid container spacing={3}>
            <Grid container item direction='column'>
              <Grid item>
                <Typography variant='h6'>{question.question}</Typography>
              </Grid>
            </Grid>
            <Grid container item direction='column' spacing={2}>
              {question.options.map((option) => (
                <Grid item key={option} onClick={() => selectAnswer(option, index)} className={classes.optionText}>
                  <Typography style={answers[index] === option ? { backgroundColor: '#E2F7F7' } : {}}>
                    {option}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          )}
        </div>
      ))}
    </>
  );
};

Questions.propTypes = {
  questionData: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
  })).isRequired,
  tabNumber: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

export default Questions;
