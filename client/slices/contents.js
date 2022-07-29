import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createContent = createAsyncThunk(
  'contents/createContent',
  async (newContent) => {
    const res = await api.post('/content/', newContent);
    return res.data;
  },
);

export const deleteContent = createAsyncThunk(
  'contents/deleteContent',
  async (id) => {
    const res = await api.delete(`/content/${id}`);
    return res.data;
  },
);

export const editContent = createAsyncThunk(
  'contents/editContent',
  async (content) => {
    const res = await api.put(`/content/${content.id}`, content);
    return res.data;
  },
);

export const getContents = createAsyncThunk(
  'contents/getContents',
  async () => {
    const res = await api.get('/content/');
    return res.data;
  },
);

export const getContent = createAsyncThunk(
  'contents/getContent',
  async (id) => {
    const res = await api.get(`/content/${id}`);
    return res.data;
  },
);

const contentsAdapter = createEntityAdapter({
  selectId: (content) => content.id,
});

const initialState = {
  content: null,
  loading: true,
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState: contentsAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: {
    [getContents.pending]: (state) => {
      state.loading = true;
    },
    [getContents.fulfilled]: (state, action) => {
      state.loading = false;
      contentsAdapter.setAll(state, action.payload);
    },
    [getContents.rejected]: (state) => {
      state.loading = false;
    },
    [getContent.pending]: (state) => {
      state.loading = true;
    },
    [getContent.fulfilled]: (state, action) => {
      state.loading = false;
      state.content = action.payload;
    },
    [getContent.rejected]: (state) => {
      state.loading = false;
    },
    [deleteContent.pending]: (state) => {
      state.loading = true;
    },
    [deleteContent.fulfilled]: (state, { payload: content }) => {
      state.loading = false;
      contentsAdapter.removeOne(state, content.id);
    },
    [deleteContent.rejected]: (state) => {
      state.loading = false;
    },
    [createContent.pending]: (state) => {
      state.loading = true;
    },
    [createContent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [createContent.rejected]: (state) => {
      state.loading = false;
    },
    [editContent.pending]: (state) => {
      state.loading = true;
    },
    [editContent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [editContent.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const contentsSelectors = contentsAdapter.getSelectors(
  (state) => state.contents,
);

// Extract the action creators object and the reducer
const { actions, reducer } = contentsSlice;
// Extract and export each action creator by name
export const { setAllContents } = actions;

export default reducer;
