import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = event => {
    setNameFilter(event.target.value);
  };

  const handleAddNewPerson = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3001/persons', newPerson).then(response => {
      newPerson.id = response.data.id;
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const lowerCaseNameFilter = nameFilter.toLowerCase();
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(lowerCaseNameFilter)
  );

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameFilter}
        onNameFilterChange={handleNameFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        onAddNewPerson={handleAddNewPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
