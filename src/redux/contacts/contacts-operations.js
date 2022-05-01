import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contactsApi from '../../services/contacts-api';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => await contactsApi.fetchContacts()
);

export const deleteContact = createAsyncThunk(
    'contacts/delete',
    async id =>(await contactsApi.deleteContact(id)).id
);

export const addContact = createAsyncThunk(
    'contacts/changeFiltre',
    async item=>await contactsApi.addContact(item)
);