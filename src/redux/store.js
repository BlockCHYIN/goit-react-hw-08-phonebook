/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import contactsReduser from './contacts/contacts-slice';
import authReduser from './auth/auth-slice';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
    },
  }),
  logger,
];

const authPersistConfig = { key: 'auth', storage, whitelist: ['token'] };

export const store = configureStore({
  reducer: {
    contacts: contactsReduser,
    auth: persistReducer(authPersistConfig, authReduser),
  },
  middleware,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
