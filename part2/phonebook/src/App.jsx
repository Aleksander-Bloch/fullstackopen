import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

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
    const personIndex = persons.findIndex(person => person.name === newName);
    if (personIndex === -1) {
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
          setSuccessMessage(`Added ${newPerson.name}`);
          setTimeout(() => setSuccessMessage(null), 3000);
        })
        .catch(error => console.log(error));
    } else {
      const foundPerson = persons[personIndex];
      const wantsToUpdate = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (!wantsToUpdate) return;
      const updatedPerson = { ...foundPerson, number: newNumber };

      personsService
        .update(foundPerson.id, updatedPerson)
        .then(() => {
          setPersons(
            persons.map(person =>
              person.id === foundPerson.id ? updatedPerson : person
            )
          );
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`Updated ${updatedPerson.name}`);
          setTimeout(() => setSuccessMessage(null), 3000);
        })
        .catch(error => console.log(error));
    }
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
      <Notification message={successMessage} />
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
