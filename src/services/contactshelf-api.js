import axios from 'axios';

axios.defaults.baseURL = 'http://connections-api.herokuapp.com';

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
      number,
    },
  });
  return data;
}

export async function deleteContact(id) {
  const { data } = await axios.delete(`/contacts/${id}`);
  data.id = id;
  return data;
}
