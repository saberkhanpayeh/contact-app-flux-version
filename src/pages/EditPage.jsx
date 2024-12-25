import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { useEditContact } from '../context/ContactContext';
import { blankAvatar } from '../constants/mockData';
import styles from "./EditPage.module.css";
import { BiArrowBack } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
function EditPage() {
  
  const {id}=useParams();
  const contact=useEditContact(id);
  console.log(id);
  return (
    <div className={styles.container}>
        <div className={styles.btn}>
          <Link to="/contacts">
          <BiArrowBack />
            <span>back to contacts</span>
          </Link>
        </div>
      {contact.image?(<img  src={contact.image} alter="contact-avatar"/>):(<img src={blankAvatar()}/>)}
      <ContactForm pageType="EDIT" contactId={id}/>
      <ToastContainer/>
    </div>
  )
}

export default EditPage