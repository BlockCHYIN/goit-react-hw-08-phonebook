import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';
import Filter from "components/Filter";
import ContactForm from "components/ContactForm";
import ContactList from "components/ContactList";
import { Layout } from "components/Layout.styles";
import { getError } from 'redux/contacts/contacts-selector';
import './App.css';

function App() {
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
            <ContactList />
            <Toaster />
        </Layout>
    );
}

export default App;