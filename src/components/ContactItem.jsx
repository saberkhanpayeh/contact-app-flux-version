import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';
import { deleteRequest } from '../services/manageRequests';
import { blankAvatar } from '../constants/mockData';
import { FaTrashCan } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import { MdEditSquare } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import styles from "./ContactItem.module.css";

function ContactItem({data,showGroupDelete}) {
  const [showMenue,setShowMenue]=useState(false);
  const [contacts,setContacts]=useContacts();
  const deleteHandler=(id)=>{
    deleteRequest(id);
    const newContacts=contacts.filter((contact)=>contact.id!==id);
    setContacts([...newContacts]);
  }
  const selectContactHandler=(id)=>{
    const newContacts=contacts.map((contact)=>{
      if(contact.id===id)
      {
          return {...contact,selected:!contact.selected}
      }
      else{
          return contact;
      }
  })
  setContacts(newContacts);
  }
  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        {
          data.image?(<img src={data.image}/>):(<img src={blankAvatar()}/>)
        }
        
      </div>
        <p>
            {data.firstName}  {data.lastName}
        </p>
        <p>
            {data.email}
        </p>
        <p>
            {data.phone}
        </p>
          {
        !!showGroupDelete &&(
        <div className={styles.checkbox}>
          <input type="checkbox" checked={data.selected} onChange={()=>selectContactHandler(data.id)} />
        </div>)
          }
        <div className={styles.btn}>
            {
              showMenue ?( <>
                      <button onClick={()=>deleteHandler(data.id)}><FaTrashCan /></button>
                      <button><Link to={`/edit/${data.id}`}><MdEditSquare/></Link></button>
                      <button onClick={()=>setShowMenue(false)}><IoCloseCircle/></button>
              </>):(<button onClick={()=>setShowMenue(true)}><IoIosArrowForward /></button>)
            }
        </div>
    </li>
  )
}

export default ContactItem