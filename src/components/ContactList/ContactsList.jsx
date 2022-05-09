import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import * as cotactsOperation from '../../redux/contacts/contacts-operations';
import { Delete, Face } from '@mui/icons-material';
import {
  getIsLoading,
  getVisibleContacts,
} from 'redux/contacts/contacts-selector';
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from '@mui/material';

export default function ContactList() {
  const [showAll, setshowAll] = useState(false);
  const contacts = useSelector(getVisibleContacts);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const showNumber = 6;
  const [loadingCheck, setLoadingCheck] = useState('');

  //   const [secondary, setSecondary] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const items = showAll ? contacts : contacts.slice(0, showNumber);

  useEffect(() => {
    dispatch(cotactsOperation.fetchContacts());
  }, []);

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      {isLoading && !items.length && (
        <RotatingLines width="100" margin="auto" />
      )}

      <List dense>
        {items.map(({ id, name, number }) => (
          <ListItem
            sx={{ width: 390 }}
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  setLoadingCheck(id);
                  dispatch(cotactsOperation.deleteContact(id));
                }}
              >
                {isLoading && loadingCheck === id && (
                  <RotatingLines width="30" margin="auto" />
                )}
                <Delete />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Face />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={number}
              // secondary={"true" ? 'Secondary text' : null}
            />
          </ListItem>
        ))}
      </List>

      {contacts[showNumber] && (
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            setshowAll(value => !value);
          }}
        >
          {!showAll ? 'Show all' : 'To hide'}
        </IconButton>
      )}
    </Grid>
  );
}
