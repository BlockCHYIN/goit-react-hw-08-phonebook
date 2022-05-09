import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import * as contactsActions from 'redux/contacts/contacts-actions';
import { LableFilter } from './LableFilter.styles';

export default function Filter() {
  const dispatch = useDispatch();

  const filterInputId = nanoid();
  return (
    <>
      <LableFilter htmlFor={filterInputId}>Find contacts by name</LableFilter>
      <input
        id={filterInputId}
        type="text"
        name="filter"
        onChange={e => dispatch(contactsActions.changeFiltre(e.target.value))}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </>
  );
}
