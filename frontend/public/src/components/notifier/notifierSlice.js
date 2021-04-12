import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'notifier',
  initialState: {
    message: '',
    open: false,
    variant: 'success',
  },
  reducers: {
    showSuccess: (state, action) => {
      state.message = action.payload;
      state.variant = 'success';
      state.open = true;
    },
    showError: (state, action) => {
      state.message = action.payload;
      state.variant = 'error';
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { showSuccess, showError, close } = slice.actions;

export const selectNotifier = (state) => state.notifier;

export default slice.reducer;
