import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import * as cotactsOperation from '../../redux/contacts/contacts-operations';
import toast from 'react-hot-toast';
import { Form } from './Form.styles';
import { getItem } from 'redux/contacts/contacts-selector';

import { Call, AccountCircle, Send } from '@mui/icons-material';
import { InputAdornment, Button, TextField } from '@mui/material';

export default function ContactForm() {
  const contacts = useSelector(getItem);
  const dispatch = useDispatch();

  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [error, setError] = useState(false);

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setname(value);
        if (error === true) {
          setError(false);
        }
        break;
      case 'number':
        setnumber(value);
        break;
      default:
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (
      !contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      dispatch(cotactsOperation.addContact({ name, number }));
    } else {
      setError(true);
      toast.error('Rosie Simpson is already in contacts.');
    }
  };

  const reset = () => {
    setname('');
    setnumber('');
  };

  useEffect(() => {
    reset();
  }, [contacts]);

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <TextField
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        label="Name"
        variant="standard"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        error={error}
      />

      <TextField
        id={numberInputId}
        type="tel"
        label="Number"
        name="number"
        value={number}
        onChange={handleChange}
        variant="standard"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Call />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" type="submit" endIcon={<Send />}>
        Send
      </Button>
    </Form>
  );
}
