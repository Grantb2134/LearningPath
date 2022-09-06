import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createContent = createAsyncThunk(
  'contents/createContent',
  async (newContent) => {
    const config = {
      headers: {
        userToken: localStorage.getItem('userToken'),
      },
    };
    const res = await api.post('/content/', newContent, config);
    return res.data;
  },
);

export const deleteContent = createAsyncThunk(
  'contents/deleteContent',
  async (id) => {
    const config = {
      headers: {
        userToken: localStorage.getItem('userToken'),
      },
    };
    const res = await api.delete(`/content/${id}`, config);
    return res.data;
  },
);

export const editContent = createAsyncThunk(
  'contents/editContent',
  async (content) => {
    const config = {
      headers: {
        userToken: localStorage.getItem('userToken'),
      },
    };
    const res = await api.put(`/content/${content.id}`, content, config);
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

export const getContentByConceptId = createAsyncThunk(
  'contents/getContentByConceptId',
  async (conceptId) => {
    const res = await api.get(`/content/concept/${conceptId}`);
    return res.data;
  },
);

const contentsAdapter = createEntityAdapter({
  selectId: (content) => content.id,
});

const initialState = {
  content: null,
  singleContent: null,
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
      contentsAdapter.setAll(state, action.payload.newContent);
    },
    [getContents.rejected]: (state) => {
      state.loading = false;
    },
    [getContent.pending]: (state) => {
      state.loading = true;
    },
    [getContent.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleContent = action.payload;
    },
    [getContent.rejected]: (state) => {
      state.loading = false;
    },
    [getContentByConceptId.pending]: (state) => {
      state.loading = true;
    },
    [getContentByConceptId.fulfilled]: (state, action) => {
      state.loading = false;
      state.content = action.payload;
    },
    [getContentByConceptId.rejected]: (state) => {
      state.loading = false;
    },
    [deleteContent.pending]: (state) => {
      state.loading = true;
    },
    [deleteContent.fulfilled]: (state, { payload: content }) => {
      state.loading = false;
      state.content = state.content.filter((single) => single.id !== parseInt(content.id));
    },
    [deleteContent.rejected]: (state) => {
      state.loading = false;
    },
    [createContent.pending]: (state) => {
      state.loading = true;
    },
    [createContent.fulfilled]: (state) => {
      state.loading = false;
    },
    [createContent.rejected]: (state) => {
      state.loading = false;
    },
    [editContent.pending]: (state) => {
      state.loading = true;
    },
    [editContent.fulfilled]: (state) => {
      state.loading = false;
    },
    [editContent.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const contentsSelectors = contentsAdapter.getSelectors(
  (state) => state.contents,
);

const { actions, reducer } = contentsSlice;
export const { setAllContents } = actions;

export default reducer;
