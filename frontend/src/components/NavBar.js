import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  AppBar, Toolbar, Button, Typography, Grid, makeStyles,
} from '@material-ui/core';

import theme from '../theme';

import { clearUser, selectRole } from './auth/userSlice';

const useStyles = makeStyles({
  navbarSpacer: {
    height: '100px',
  },
  toolBar: {
    minHeight: '85px',
  },
  appHeading: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  pageHeading: {
    color: theme.palette.secondary.dark,
  },
});

const Navbar = ({ pageHeading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const role = useSelector(selectRole);

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem('auth-token');
  };

  const goToHome = () => {
    history.push('/');
  };

  const goToCreateQuiz = (event) => {
    event.preventDefault();
    history.push('/createQuiz');
  };

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h3' onClick={goToHome} className={classes.appHeading}>
                QuizApp
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h3' className={classes.pageHeading}>
                {pageHeading}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {role === 'editor' ? (
                  <Grid item>
                    <Button onClick={goToCreateQuiz} variant='contained' color='secondary'>
                      Create New Quiz
                    </Button>
                  </Grid>
                ) : null}
                <Grid item>
                  <Button onClick={logout} variant='contained' color='secondary'>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.navbarSpacer} />
    </>
  );
};

Navbar.propTypes = {
  pageHeading: PropTypes.string,
};

Navbar.defaultProps = {
  pageHeading: '',
};

export default Navbar;
