import { createReducer } from "@reduxjs/toolkit";
import userActions from "./actions";

// The state stores the currently displayed user, plus pagination details
// and information about the deletion and creation processes for other purposes
// such as error displaying, loading spinners, etc.
const initialState = {
  users: {
    value: [],
    loading: false,
    error: null,
  },
  pagination: {
    page: 1,
    limit: 5,
    prev: null,
    next: null,
    first: 1,
    last: 1,
  },
  deletion: {
    loading: false,
    error: null,
  },
  creation: {
    loading: false,
    error: null,
  }
};

const userReducer = createReducer(initialState, {
  [userActions.index.pending]: (state) => {
    state.users.loading = true;
  },
  [userActions.index.fulfilled]: (state, { payload, meta }) => {
    state.users.loading = false;
    // Exteact the users and pagination information
    const { pagination = {}, data } = payload;
    // Update users data
    state.users.value = data;
    // Update pagination data
    state.pagination.page = meta.arg.page;
    state.pagination.limit = meta.arg.limit;
    state.pagination.prev = pagination.prev;
    state.pagination.next = pagination.next;
    state.pagination.first = pagination.first;
    state.pagination.last = pagination.last;
    // Nullify errors
    state.users.error = null;
  },
  [userActions.index.rejected]: (state, { error }) => {
    state.users.loading = false;
    // Nullify users data
    state.users.value = [];
    // Save errors for later use
    state.users.error = error;
  },
  [userActions.delete.pending]: (state) => {
    state.deletion.loading = true;
  },
  [userActions.delete.fulfilled]: (state) => {
    state.deletion.loading = false;
    // Nullify errors
    state.deletion.error = null;
    // Reset pagination
    state.pagination.page = 1;
  },
  [userActions.delete.rejected]: (state, { error }) => {
    state.deletion.loading = false;
    // Save errors for later use
    state.deletion.error = error;
  },
  [userActions.create.pending]: (state) => {
    state.creation.loading = true;
  },
  [userActions.create.fulfilled]: (state) => {
    state.creation.loading = false;
    // Nullify errors
    state.creation.error = null;
    // Reset pagination
    state.pagination.page = 1;
  },
  [userActions.create.rejected]: (state, { error }) => {
    state.creation.loading = false;
    // Save errors for later use
    state.creation.error = error;
  },
});

export default userReducer;
