import { createAsyncThunk } from '@reduxjs/toolkit';

import * as contactShelfApi from '../../services/contactshelf-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      return await contactShelfApi.fetchContacts();
    } catch (error) {
      return error;
    }
  }
);

export const deleteContact = createAsyncThunk('contacts/delete', async id => {
  try {
    return (await contactShelfApi.deleteContact(id)).id;
  } catch (error) {
    return error;
  }
});

export const addContact = createAsyncThunk(
  'contacts/changeFiltre',
  async item => {
    try {
      return await contactShelfApi.addContact(item);
    } catch (error) {
      return error;
    }
  }
);
