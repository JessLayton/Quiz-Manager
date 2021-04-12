import { configureStore } from '@reduxjs/toolkit';

import userReducer from './components/auth/userSlice';
import notifierReducer from './components/notifier/notifierSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notifier: notifierReducer,
  },
});

export default store;
