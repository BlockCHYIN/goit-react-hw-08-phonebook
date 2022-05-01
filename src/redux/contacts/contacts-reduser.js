import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  fetchContacts,
  deleteContact,
  addContact,
} from './contacts-operations';
import { changeFiltre } from './contacts-actions';

const items = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
  [changeFiltre]: (_, { payload }) => payload,
});

const isLoading = createReducer(false, {
  [addContact.pending]: () => true,
  [deleteContact.pending]: () => true,
  [fetchContacts.pending]: () => true,

  [addContact.fulfilled]: () => false,
  [deleteContact.fulfilled]: () => false,
  [fetchContacts.fulfilled]: () => false,

  [addContact.rejected]: () => false,
  [deleteContact.rejected]: () => false,
  [fetchContacts.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, { error }) => error.message,
  [fetchContacts.pending]: () => null,
  [deleteContact.rejected]: (_, { error }) => error.message,
  [deleteContact.pending]: () => null,
  [addContact.rejected]: (_, { error }) => error.message,
  [addContact.pending]: () => null,
});

export default combineReducers({
  items,
  isLoading,
  error,
  filter,
});


