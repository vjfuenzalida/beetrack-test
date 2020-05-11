import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import UsersAPI from '../../api/users-api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (payload, thunkAPI) => {
    const response = await UsersAPI.fetchUsers(payload, thunkAPI.signal);
    return response;
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload, thunkAPI) => {
    const response = await UsersAPI.createUser(payload, thunkAPI.signal);
    return response;
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (payload, thunkAPI) => {
    const response = await UsersAPI.deleteUser(payload, thunkAPI.signal);
    return response;
  }
)

export const saveSearch = createAction('users/saveSearch');

const userActions = {
  index: fetchUsers,
  search: saveSearch,
  create: createUser,
  delete: deleteUser,
}

export default userActions;