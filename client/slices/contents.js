import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: null,
  loading: true,
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

// Extract the action creators object and the reducer
const { reducer } = contentsSlice;

export default reducer;
