import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/', newUser);
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (newAuth, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/', newAuth);
      localStorage.setItem('userToken', JSON.stringify(res.data.token));
      return res.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          userToken: localStorage.getItem('userToken'),
        },
      };

      const res = await api.get('/auth/', config);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [createUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.token;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [currentUser.pending]: (state) => {
      state.loading = true;
    },
    [currentUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [currentUser.rejected]: (state) => {
      state.loading = false;
    },

  },
});

export const authSelectors = (state) => state.auth;

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { setAllAuth, logout } = actions;

export default reducer;
