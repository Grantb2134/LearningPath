import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createPath = createAsyncThunk(
  'paths/createPath',
  async (newPath) => {
    const res = await api.post('/paths/', newPath);
    return res.data;
  },
);

export const deletePath = createAsyncThunk(
  'paths/deletePath',
  async (id) => {
    const res = await api.delete(`/paths/${id}`);
    return res.data;
  },
);

export const editPath = createAsyncThunk(
  'paths/editPath',
  async (path) => {
    const res = await api.put(`/paths/${path.id}`, path);
    return res.data;
  },
);

export const getPaths = createAsyncThunk(
  'paths/getPaths',
  async () => {
    const res = await api.get('/paths/');
    return res.data;
  },
);

export const getPath = createAsyncThunk(
  'paths/getPath',
  async (id) => {
    const res = await api.get(`/paths/${id}`);
    return res.data;
  },
);

const pathsAdapter = createEntityAdapter({
  selectId: (path) => path.id,
});

const initialState = {
  path: null,
  loading: true,
};

const pathsSlice = createSlice({
  name: 'paths',
  initialState: pathsAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: {
    [getPaths.pending]: (state) => {
      state.loading = true;
    },
    [getPaths.fulfilled]: (state, action) => {
      state.loading = false;
      pathsAdapter.setAll(state, action.payload);
    },
    [getPaths.rejected]: (state) => {
      state.loading = false;
    },
    [getPath.pending]: (state) => {
      state.loading = true;
    },
    [getPath.fulfilled]: (state, action) => {
      state.loading = false;
      state.path = action.payload;
    },
    [getPath.rejected]: (state) => {
      state.loading = false;
    },
    [deletePath.pending]: (state) => {
      state.loading = true;
    },
    [deletePath.fulfilled]: (state, { payload: path }) => {
      state.loading = false;
      pathsAdapter.removeOne(state, path.id);
    },
    [deletePath.rejected]: (state) => {
      state.loading = false;
    },
    [createPath.pending]: (state) => {
      state.loading = true;
    },
    [createPath.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [createPath.rejected]: (state) => {
      state.loading = false;
    },
    [editPath.pending]: (state) => {
      state.loading = true;
    },
    [editPath.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = payload;
    },
    [editPath.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const pathsSelectors = pathsAdapter.getSelectors(
  (state) => state.paths,
);

// Extract the action creators object and the reducer
const { actions, reducer } = pathsSlice;
// Extract and export each action creator by name
export const { setAllPaths } = actions;

// export const { selectAll, selectIds, selectById, selectTotal, selectEntities } = pathsSelectors;
// export const { getPath } = actions
// Export the reducer, either as a default or named export
export default reducer;