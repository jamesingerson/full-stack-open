import { useState, useEffect } from "react";

import personsService from "./services/persons";

import Notification from "./components/Notification";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  function showNotification(message, status) {
    setNotification({ message, status });
    setTimeout(() => setNotification(null), 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already in the Phonebook, update their number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification(`${returnedPerson.name} updated.`, "success");
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`${returnedPerson.name} added.`, "success");
        })
        .catch((error) => {
          showNotification(`${error.response.data.error}`, "error");
        });
    }
  };

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} from the Phonebook?`)) {
      personsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          showNotification(`${person.name} already deleted.`, "error");
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToDisplay =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>New Entry</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToDisplay.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default App;
