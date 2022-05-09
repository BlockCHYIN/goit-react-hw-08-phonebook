import { createSelector } from '@reduxjs/toolkit';

export const getItem = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getError = state => state.contacts.error;
export const getIsLoading = state => state.contacts.isLoading;

export const getVisibleContacts = createSelector(
  [getItem, getFilter],
  (items, filter) => {
    const normalaseFilter = filter.toLowerCase();
    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalaseFilter)
    );
  }
);
