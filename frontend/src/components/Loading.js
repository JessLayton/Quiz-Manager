import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  spinner: {
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <CircularProgress size={35} />
    </div>
  );
};

export default Loading;
