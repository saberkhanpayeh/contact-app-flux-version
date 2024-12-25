import { Form } from "react-router-dom";
import ContactItem from "../components/ContactItem";
import { useContacts } from "../context/ContactContext"
import ContactForm from "../components/ContactForm";
import { useEffect, useState } from "react";
import { FaTrash, FaUserCheck } from "react-icons/fa6";
import Modal from "../components/Modal";
import { isUserSelect, notUserSelect } from "../helpers/helper";
import { useModal } from "../context/ModalContext";
import { deleteMultipleContacts } from "../services/manageRequests";
import styles from "./ContactsPage.module.css";
import { IoArrowRedo } from "react-icons/io5";
import SearchBox from "../components/SearchBox";
import { ToastContainer,toast } from "react-toastify";
import { toastOptions } from "../constants/options";

function ContactsPage() {
  const [contacts,setContacts]=useContacts();
  const [showGroupDelete,setShowGroupDelete]=useState(false);
  const [showModal,setShowModal]=useState("");
  const [modalState,dispatchModal]=useModal();
  useEffect(()=>{
    setContacts(contacts);
    console.log("effect")
  },[contacts])
  const deleteHandler=()=>{
    if(!isUserSelect(contacts).length)
      return;
    const type="GROUP_DELETE";
    setShowModal(type);
    dispatchModal({type}); 
  }
  const groupDeleteHandler=()=>{
    const removedContacts=isUserSelect(contacts)
    deleteMultipleContacts(removedContacts);
    setContacts(notUserSelect(contacts));
    setShowModal("");
    toast.info(`"${removedContacts.length}" contact has removed!`,toastOptions);
  }
  
  return (
    <div className={styles.container}>
    <ContactForm/>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
        <h3>
            Contacts List
        </h3>         
                {
                    showGroupDelete && contacts.length?(
                        <div>
                            <button onClick={()=>setShowGroupDelete(false)}><IoArrowRedo /></button>
                            <button onClick={deleteHandler} ><FaTrash /></button>
                        </div>):(<button onClick={()=>setShowGroupDelete(true)}><FaUserCheck/> </button>)
                }
        </div>
        <SearchBox contacts={contacts} setContacts={setContacts}/>
          <ul className={styles.list}>
            {contacts.map((contact)=>(<ContactItem key={contact.id} data={contact} showGroupDelete={showGroupDelete} />))}
          </ul>
      </div>
      {isUserSelect(contacts).length && showModal==="GROUP_DELETE"?<Modal setShowModal={setShowModal}  functionHandler={groupDeleteHandler}/>:null}
      <ToastContainer/>
    </div>
  
  )
}

export default ContactsPage