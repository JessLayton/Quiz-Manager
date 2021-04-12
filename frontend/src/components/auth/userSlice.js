import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    role: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.id = '';
      state.username = '';
      state.role = '';
    },
  },
});

export const { setUser, clearUser } = slice.actions;

export const selectUser = (state) => state.user;

export const selectRole = (state) => state.user.role;

export default slice.reducer;
