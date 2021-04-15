import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';

import { close, selectNotifier } from './notifierSlice';

const Notifier = () => {
  const dispatch = useDispatch();
  const { message, open, variant } = useSelector(selectNotifier);

  const handleClose = () => {
    dispatch(close());
  };

  const getTitle = (outcome) => {
    switch (outcome) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      default:
        return 'Success';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MuiAlert
        variant='filled'
        elevation={6}
        severity={variant}
        onClose={handleClose}
      >
        <AlertTitle>{getTitle(variant)}</AlertTitle>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notifier;
