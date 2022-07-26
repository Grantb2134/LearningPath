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

export const getUserByUsername = createAsyncThunk(
  'users/getUserByUsername',
  async (username) => {
    const res = await api.get(`/users/username/${username}`);
    return res.data;
  },
);

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (passwordData) => {
    const config = {
      headers: {
        userToken: localStorage.getItem('userToken'),
      },
    };
    const res = await api.put('/users/password', passwordData, config);
    return res.data;
  },
);

export const changeSettings = createAsyncThunk(
  'users/changeSettings',
  async (userData) => {
    const config = {
      headers: {
        userToken: localStorage.getItem('userToken'),
      },
    };
    const res = await api.put('/users/credentials/', userData, config);
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
    [getUserByUsername.pending]: (state) => {
      state.loading = true;
    },
    [getUserByUsername.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUserByUsername.rejected]: (state) => {
      state.loading = false;
    },
    [changeSettings.pending]: (state) => {
      state.loading = true;
    },
    [changeSettings.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [changeSettings.rejected]: (state) => {
      state.loading = false;
    },
    [changePassword.pending]: (state) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [changePassword.rejected]: (state) => {
      state.loading = false;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload: user }) => {
      state.loading = false;
      state.users = state.users.filter((singleUser) => singleUser.id !== parseInt(user.id));
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
const { reducer } = usersSlice;

export default reducer;
