import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DialogBox from '../../DialogBox';

const QuizScore = ({
  score, open, handleClose,
}) => {
  const history = useHistory();

  const refreshPage = () => {
    window.location.reload();
  };

  const goToHome = () => {
    history.push('/');
  };

  const getFeedback = (quizScore) => {
    if (quizScore === 100) {
      return <>Perfect score - well done! &#127881;</>;
    } if (quizScore < 100 && quizScore >= 80) {
      return <>Great score - well done! &#128512;</>;
    } if (quizScore < 80 && quizScore >= 60) {
      return <>Good score - well done! &#128077;</>;
    } if (quizScore < 60 && quizScore >= 40) {
      return <>Not bad - try again &#128257;</>;
    } if (quizScore < 40) {
      return <>Bad luck - try again &#128257;</>;
    }
  };

  return (
    <DialogBox
      title='Score'
      description={getFeedback(score)}
      text={`${score.toFixed()}%`}
      optionOne={refreshPage}
      optionOneText='Play again'
      optionTwo={goToHome}
      optionTwoText='Return home'
      open={open}
      handleClose={handleClose}
    />
  );
};

QuizScore.propTypes = {
  score: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

QuizScore.defaultProps = {
  open: false,
};

export default QuizScore;
