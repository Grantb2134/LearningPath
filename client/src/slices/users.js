import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from '../utils/api';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const res = await api.get('/users/');
    return res.data;
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
);

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});

const initialState = {
  user: null,
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.setAll(state, action.payload);
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload: user }) => {
      state.loading = false;
      usersAdapter.removeOne(state, user.id);
    },
    [deleteUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const usersSelectors = usersAdapter.getSelectors(
  (state) => state.users,
);

export const { setAllUsers } = usersSlice.actions;

// Extract the action creators object and the reducer
const { reducer } = usersSlice;

export default reducer;