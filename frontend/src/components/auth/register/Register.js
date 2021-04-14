import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Button,
  Link,
} from '@material-ui/core';

import { register } from '../../../connections/userDatabaseService';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import UsernameField from './UsernameField';
import { showError } from '../../notifier/notifierSlice';
import { setUser } from '../userSlice';

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

const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let registerResponse;
    try {
      registerResponse = await register(email, username, password, confirmPassword);
      if (registerResponse && registerResponse.data) {
        dispatch(setUser(registerResponse.data.user));
        localStorage.setItem('auth-token', registerResponse.data.token);
        history.push('/');
      } else {
        dispatch(showError('Failed to register - please fill in all fields correctly'));
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
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <EmailField value={email} onValueChange={setEmail} />
                </Grid>
                <Grid item>
                  <UsernameField value={username} onValueChange={setUsername} />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={password}
                    onValueChange={setPassword}
                    label='Password'
                  />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    label='Confirm Password'
                  />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='secondary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Already have an account?
                  </Typography>
                  <Typography variant='body1'>
                    <Link href='/login'>Login here</Link>
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

export default Register;
