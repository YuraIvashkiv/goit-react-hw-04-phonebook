import { Form as ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { StyledFilter } from './ContactList/ContactList.styled';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter';
import { useEffect, useState } from 'react';

const localStorageKey = 'contacts';

const contactsArray = () => {
  const savedContacts = localStorage.getItem(localStorageKey);
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
};

export const App = () => {
  const [contacts, setContacts] = useState(contactsArray());

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const contactWithId = { ...newContact, id: nanoid() };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === contactWithId.name.toLowerCase()
      )
    ) {
      alert(`${contactWithId.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, contactWithId]);
    }
  };

  const handleFilterChange = event => {
    setFilter(prevState => ({
      ...prevState,
      filter: event.target.value,
    }));
  };

  const onDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onDeleteContact = contactId => {
    onDelete(contactId);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <StyledFilter>
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </StyledFilter>

      <ContactList contacts={filteredContacts} onClick={onDeleteContact} />
    </div>
  );
};
