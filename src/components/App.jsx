import { Form } from "./Form";
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import { ContactList } from "./ContactList";
import { Filter } from "./Filter";


export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse( localStorage.getItem('contacts')) ?? []);
const [filter, setFilter] = useState('')

useEffect(() => {

  
  localStorage.setItem('contacts', JSON.stringify(contacts))
  
}, [contacts])

useEffect(() => {
  const contacts = JSON.parse(localStorage.getItem('contacts'))
  if(contacts) {
    setContacts(contacts)
  }
}, [])


  const ContactFilter = evt => {
    setFilter(evt.currentTarget.value)
  
  };

const getVisibleContacts = () => {
  const NormalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(NormalizedFilter))
  
}

  const addContact = (newName, newPhone) => {
    console.log(newName);
    console.log(newPhone);
    const equalName = contacts.find(element => element.name.toLowerCase() === newName.toLowerCase())
    const addContactObj = {
      id: nanoid(),
      name:newName, 
      phone:newPhone,
     
    }
    console.log(addContactObj);
if (equalName) return alert(`${equalName.name} is already in contacts`)

setContacts(
  [...contacts, addContactObj]
)

          }


const deleteContact = (id) => {
  setContacts(contacts.filter((el)=> el.id !== id))

}



  const VisibleContacts = getVisibleContacts()

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h1 style={{margin:0}}>Phonebook</h1>
<Form addContact={addContact} />
<h2>Contacts</h2>
<Filter value ={filter} onChange = {ContactFilter}/>
<ContactList array = {VisibleContacts} deleteContact={deleteContact}/>
    </div>
  );

}