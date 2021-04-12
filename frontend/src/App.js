import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { checkToken } from './connections/userDatabaseService';
import Routes from './routes/Routes';
import Loading from './components/Loading';
import Notifier from './components/notifier/Notifier';
import theme from './theme';
import { setUser, clearUser } from './components/auth/userSlice';

const App = () => {
  const dispatch = useDispatch();

  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const tokenResponse = await checkToken();
      if (tokenResponse) {
        dispatch(setUser(tokenResponse.data.user));
      } else {
        dispatch(clearUser());
        localStorage.removeItem('auth-token');
      }
      isLoading(false);
    };
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Notifier />
      {loading
        ? (
          <Loading />
        )
        : (
          <Routes />
        )}
    </ThemeProvider>
  );
};

export default App;
