import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import * as cotactsOperation from '../../redux/contacts/contacts-operations';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getIsLoading,
  getVisibleContacts,
} from 'redux/contacts/contacts-selector';
import ContactListItem from '../ContactListItem';

import { List } from './List.styled';
import { Loader } from './Loader.styled';
import { ItemCenter } from './ItemCenter.styles';

export default function ContactList() {
  const [showAll, setshowAll] = useState(false);
  const contacts = useSelector(getVisibleContacts);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const showNumber = 6;
  const items = showAll ? contacts : contacts.slice(0, showNumber);

  useEffect(() => {
    dispatch(cotactsOperation.fetchContacts());
  }, []);

  return (
    <List>
      {isLoading ? (
        <Loader>
          <RotatingLines width="100" margin="auto" />
        </Loader>
      ) : (
        <>
          {items.map(({ id, name, number }) => (
            <ContactListItem key={id} name={name} number={number}>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  dispatch(cotactsOperation.deleteContact(id));
                }}
              >
                Delete
              </Button>
            </ContactListItem>
          ))}
          {items[showNumber - 1] && (
            <ItemCenter>
              <button
                onClick={() => {
                  setshowAll(value => !value);
                }}
              >
                {!showAll ? 'Show all' : 'To hide'}
              </button>
            </ItemCenter>
          )}
        </>
      )}
    </List>
  );
}
