import axios from "axios";

axios.defaults.baseURL = 'https://6263f39498095dcbf9292267.mockapi.io/contacts';

export async function fetchContacts() {
    const { data } = await axios.get('/contacts');
    return data;
}

export async function addContact({ name, number }) {
    const { data } = await axios({
        method: 'post',
        url: '/contacts',
        data: {
            name,
            phone: number,
        },
    });
    return data;
}

export async function deleteContact(id) {
    const { data } = await axios.delete(`/contacts/${id}`);
    return data;
}