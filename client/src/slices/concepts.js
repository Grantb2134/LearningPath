import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createConcept = createAsyncThunk(
  'concepts/createConcept',
  async (newConcept) => {
    const res = await api.post('/concepts/', newConcept);
    return res.data;
  },
);

export const deleteConcept = createAsyncThunk(
  'concepts/deleteConcept',
  async (id) => {
    const res = await api.delete(`/concepts/${id}`);
    return res.data;
  },
);

export const editConcept = createAsyncThunk(
  'concepts/editConcept',
  async (concept) => {
    const res = await api.put(`/concepts/${concept.id}`, concept);
    return res.data;
  },
);

export const getConcepts = createAsyncThunk(
  'concepts/getConcepts',
  async () => {
    const res = await api.get('/concepts/');
    return res.data;
  },
);

export const getConcept = createAsyncThunk(
  'concepts/getConcept',
  async (id) => {
    const res = await api.get(`/concepts/${id}`);
    return res.data;
  },
);

const conceptsAdapter = createEntityAdapter({
  selectId: (concept) => concept.id,
});

const initialState = {
  concept: null,
  loading: true,
};

const conceptsSlice = createSlice({
  name: 'concepts',
  initialState: conceptsAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: {
    [getConcepts.pending]: (state) => {
      state.loading = true;
    },
    [getConcepts.fulfilled]: (state, action) => {
      state.loading = false;
      conceptsAdapter.setAll(state, action.payload);
    },
    [getConcepts.rejected]: (state) => {
      state.loading = false;
    },
    [getConcept.pending]: (state) => {
      state.loading = true;
    },
    [getConcept.fulfilled]: (state, action) => {
      state.loading = false;
      state.concept = action.payload;
    },
    [getConcept.rejected]: (state) => {
      state.loading = false;
    },
    [deleteConcept.pending]: (state) => {
      state.loading = true;
    },
    [deleteConcept.fulfilled]: (state, { payload: concept }) => {
      state.loading = false;
      conceptsAdapter.removeOne(state, concept.id);
    },
    [deleteConcept.rejected]: (state) => {
      state.loading = false;
    },
    [createConcept.pending]: (state) => {
      state.loading = true;
    },
    [createConcept.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [createConcept.rejected]: (state) => {
      state.loading = false;
    },
    [editConcept.pending]: (state) => {
      state.loading = true;
    },
    [editConcept.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [editConcept.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const conceptsSelectors = conceptsAdapter.getSelectors(
  (state) => state.concepts,
);

// Extract the action creators object and the reducer
const { actions, reducer } = conceptsSlice;
// Extract and export each action creator by name
export const { setAllConcepts } = actions;

export default reducer;
