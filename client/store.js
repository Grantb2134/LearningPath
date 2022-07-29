import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users';
import pathsReducer from './slices/paths';
import conceptReducer from './slices/concepts';
import contentReducer from './slices/contents';
import authReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    paths: pathsReducer,
    concepts: conceptReducer,
    contents: contentReducer,
    auth: authReducer,
  },
});
