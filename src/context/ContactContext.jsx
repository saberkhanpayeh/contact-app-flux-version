import React, { createContext, useContext, useEffect, useState } from 'react'
const ContactContext=createContext();
function ContactProvider({children}) {
  const [contacts,setContacts]=useState([]);
  useEffect(()=>{
    const fetchContacts= async ()=>{
      try{
        const reponse= await fetch("http://localhost:3000/contacts");
        const json=await reponse.json();
        console.log(json);
        setContacts(json);
        
      }catch(error){
        console.log(error.message);
      }
    }
  fetchContacts();
  },[]);
  console.log(contacts);
  return (
    <ContactContext.Provider value={{contacts,setContacts}}>
      {children}
    </ContactContext.Provider>
  )
}
const useContacts=()=>{
  const {contacts,setContacts}=useContext(ContactContext);
  return [contacts,setContacts];
}

const useEditContact=(id)=>{
  const [contacts,setContacts]=useContacts();
  const result=contacts.find(contact=>(contact.id===id));
  return result; 
}

export default ContactProvider
export {useContacts,useEditContact};