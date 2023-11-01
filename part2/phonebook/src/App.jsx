import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

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

    personsService
      .create(newPerson)
      .then(createdId => {
        newPerson.id = createdId;
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.log(error));
  };

  const handleDeletePerson = deletedPerson => {
    if (!window.confirm(`Delete ${deletedPerson.name}?`)) return;

    personsService
      .remove(deletedPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
      })
      .catch(error => console.log(error));
  };

  const lowerCaseNameFilter = nameFilter.toLowerCase();
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(lowerCaseNameFilter)
  );

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons));
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
      <Persons persons={filteredPersons} onDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
