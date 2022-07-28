import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  concept: null,
  loading: true,
};

const conceptsSlice = createSlice({
  name: 'concepts',
  initialState,
  reducers: {
  },
  extraReducers: {
  },
});

// Extract the action creators object and the reducer
const { reducer } = conceptsSlice;

export default reducer;
