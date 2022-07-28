import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

export const authSelectors = (state) => state.auth;

// Extract the action creators object and the reducer
const { reducer } = authSlice;

export default reducer;
