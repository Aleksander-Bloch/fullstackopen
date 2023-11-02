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
  const [errorMessage, setErrorMessage] = useState(null);

  const displaySuccessMessage = name => {
    setSuccessMessage(`Added ${name}`);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const displayErrorMessage = name => {
    setErrorMessage(
      `Information of ${name} has already been removed from server`
    );
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const addPerson = () => {
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
        displaySuccessMessage(newPerson.name);
      })
      .catch(error => console.log(error));
  };

  const updatePerson = personIndex => {
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
        displaySuccessMessage(updatedPerson.name);
      })
      .catch(() => {
        displayErrorMessage(updatedPerson.name);
        setPersons(persons.filter(person => person.id !== updatedPerson.id));
      });
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleNameFilterChange = event => {
    setNameFilter(event.target.value);
  };

  const handlePersonFormSubmission = event => {
    event.preventDefault();
    const personIndex = persons.findIndex(person => person.name === newName);
    if (personIndex === -1) {
      addPerson();
    } else {
      updatePerson(personIndex);
    }
  };

  const handleDeletePerson = deletedPerson => {
    if (!window.confirm(`Delete ${deletedPerson.name}?`)) return;

    personsService
      .remove(deletedPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
      })
      .catch(() => {
        displayErrorMessage(deletedPerson.name);
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
      });
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
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter
        nameFilter={nameFilter}
        onNameFilterChange={handleNameFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        onPersonFormSubmission={handlePersonFormSubmission}
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
