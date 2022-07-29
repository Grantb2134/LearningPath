import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

export const { setAllUsers } = usersSlice.actions;

// Extract the action creators object and the reducer
const { reducer } = usersSlice;

export default reducer;
