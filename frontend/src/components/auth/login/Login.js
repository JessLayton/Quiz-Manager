import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Button,
  Link,
} from '@material-ui/core';

import { login } from '../../../connections/userDatabaseService';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import { showError } from '../../notifier/notifierSlice';
import { setUser, clearUser } from '../userSlice';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '20px',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  form: {
    marginTop: '20px',
    marginBottom: '30px',
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let loginResponse;
    try {
      loginResponse = await login(username, password);
      if (loginResponse && loginResponse.data) {
        dispatch(setUser(loginResponse.data.user));
        localStorage.setItem('auth-token', loginResponse.data.token);
        history.push('/');
      } else {
        dispatch(clearUser());
        dispatch(showError('Failed to login'));
      }
    } catch (error) {
      console.error(error);
      dispatch(showError(error.message));
    }
  };

  return (
    <Grid container item justify='center' alignItems='center'>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <Grid container align='center' className={classes.form}>
            <Grid container item justify='center' alignItems='center'>
              <Grid container spacing={2} direction='column'>
                <Grid item>
                  <Typography variant='h3' component='h1'>
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <UsernameField onValueChange={setUsername} value={username} />
                </Grid>
                <Grid item>
                  <PasswordField onValueChange={setPassword} value={password} />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='secondary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Don&apos;t have an account?
                  </Typography>
                  <Typography variant='body1'>
                    <Link href='/register'>Register here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default Login;
