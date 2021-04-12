import React from 'react';
import PropTypes from 'prop-types';

import DialogBox from '../../DialogBox';

const DeleteDialog = ({
  open, deleteQuiz, handleClose, quizName,
}) => (
  <DialogBox
    title='Are you sure?'
    description={`This will permanently delete the quiz: ${quizName}`}
    optionOne={deleteQuiz}
    optionOneText='Delete quiz'
    optionTwo={handleClose}
    optionTwoText='Cancel'
    open={open}
    handleClose={handleClose}
  />
);

DeleteDialog.propTypes = {
  deleteQuiz: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  quizName: PropTypes.string,
};

DeleteDialog.defaultProps = {
  open: false,
  quizName: '',
};

export default DeleteDialog;
