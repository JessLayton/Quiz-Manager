import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import {
  Card,
  Container,
  Button,
  makeStyles,
  Grid,
} from '@material-ui/core';

import QuestionTabs from './QuestionTabs';
import Questions from './Questions';
import QuizScore from './QuizScore';

import { markQuiz } from '../../../connections/quizDatabaseService';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '20px',
    textAlign: 'center',
    padding: '10px',
  },
  content: {
    marginTop: '20px',
    marginBottom: '30px',
  },
}));

const QuizCard = ({ questions }) => {
  const classes = useStyles();
  const params = useParams();

  const [answers, setAnswers] = React.useState([]);
  const [tabNumber, setTabNumber] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  const selectQuestion = (event, newValue) => {
    setTabNumber(newValue);
  };

  const selectAnswer = (option, optionIndex) => {
    if (tabNumber < (questions.length - 1)) {
      setTabNumber(tabNumber + 1);
    }
    const updatedAnswers = [...answers];
    updatedAnswers[optionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const allQuestionedAnswered = answers.length === (answers.filter((answer) => answer !== null)).length;

  const getQuizResult = async () => {
    const quizId = params.id;
    let quizResult;
    try {
      quizResult = await markQuiz(quizId, answers);
      if (quizResult && quizResult.data) {
        setScore(quizResult.data.result);
        setShowScore(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowScore = () => {
    setShowScore(false);
  };

  return (
    <Container xs={10}>
      <Card className={classes.card}>
        <Grid container direction='column' spacing={5}>
          <Grid item>
            <QuestionTabs
              questionData={questions}
              tabNumber={tabNumber}
              selectQuestion={(event, newValue) => selectQuestion(event, newValue)}
            />
            <Questions
              questionData={questions}
              tabNumber={tabNumber}
              answers={answers}
              selectAnswer={(option, questionNumber) => selectAnswer(option, questionNumber)}
            />
          </Grid>
          <Grid container item justify='flex-end'>
            <Grid item>
              <Button onClick={getQuizResult} disabled={!allQuestionedAnswered} variant='contained' color='secondary'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <QuizScore score={score} open={showScore} handleClose={handleShowScore} />
      </Card>
    </Container>
  );
};

QuizCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({ question: PropTypes.string })).isRequired,
};

export default QuizCard;
