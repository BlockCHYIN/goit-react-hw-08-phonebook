import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Filter from '../components/Filter';
import ContactForm from '../components/ContactForm';
import ContactsList from '../components/ContactList/ContactsList';
import { Layout } from '../components/Layout.styles';

import { getError } from 'redux/contacts/contacts-selector';

export default function PhoneBookView() {
  const error = useSelector(getError);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Layout>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactsList />
      <Toaster />
    </Layout>
  );
}
