import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogContent, DialogTitle, DialogActions, Slide, Typography, IconButton, makeStyles, Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    right: '2px',
    top: '2px',
    color: 'grey',
  },
}));

const DialogBox = ({
  title, description, text, optionOne, optionOneText, optionTwo, optionTwoText, open, handleClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
      <DialogTitle>
        <Typography component='span' variant='h6'>{title}</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          {description}
        </Typography>
        <Typography>
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={optionOne} variant='contained' color='primary'>{optionOneText}</Button>
        <Button onClick={optionTwo} variant='contained' color='primary'>{optionTwoText}</Button>
      </DialogActions>
    </Dialog>
  );
};

DialogBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  text: PropTypes.string,
  optionOne: PropTypes.func.isRequired,
  optionOneText: PropTypes.string.isRequired,
  optionTwo: PropTypes.func.isRequired,
  optionTwoText: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

DialogBox.defaultProps = {
  description: null,
  text: '',
  open: false,
};

export default DialogBox;
