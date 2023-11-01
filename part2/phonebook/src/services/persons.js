import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newPerson =>
  axios.post(baseUrl, newPerson).then(response => response.data.id);

const remove = personId => axios.delete(`${baseUrl}/${personId}`);

const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson);

export default { getAll, create, remove, update };
