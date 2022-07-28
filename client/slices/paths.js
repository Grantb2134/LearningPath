import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: null,
  loading: true,
};

const pathsSlice = createSlice({
  name: 'paths',
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

// Extract the action creators object and the reducer
const { reducer } = pathsSlice;

export default reducer;
