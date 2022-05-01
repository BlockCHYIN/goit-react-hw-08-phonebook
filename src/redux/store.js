import { configureStore } from '@reduxjs/toolkit';
import contactsReduser from './contacts/contacts-reduser';

export const store = configureStore({
  reducer: { contacts:contactsReduser },
});