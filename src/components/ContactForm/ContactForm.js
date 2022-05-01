import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import * as contactsOperation from '../../redux/contacts/contacts-operations';
import toast from 'react-hot-toast';
import { Form } from './Form.styles';
import { InputForm } from './InputForm.styles';
import { getItem } from 'redux/contacts/contacts-selector';

export default function ContactForm() {
  const contacts = useSelector(getItem);
  const dispatch = useDispatch();

  const [name, setname] = useState('');
  const [number, setnumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setname(value);
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
      dispatch(contactsOperation.addContact({ name, number }));
    } else {
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
      <label htmlFor={nameInputId}> Name </label>

      <InputForm
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor={numberInputId}> Number </label>

      <InputForm
        id={numberInputId}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit">add contact</button>
    </Form>
  );
}
