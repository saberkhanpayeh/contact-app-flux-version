import React, { useEffect, useState } from 'react'
import inputs from '../constants/inputs'
import { useOperations } from '../context/OperationsContext';
import Modal from './Modal';
import { useModal } from '../context/ModalContext';
import { newContactRequest, UpdateContactRequest } from '../services/manageRequests';
import { useContacts, useEditContact } from '../context/ContactContext';
import styles from "./ContactForm.module.css";
import { FaPen } from 'react-icons/fa6';
import ContactAvatar from './ContactAvatar';
import { ToastContainer,toast } from 'react-toastify';
import { initialEmptyContact, toastOptions } from '../constants/options';
import { validationFormValue } from '../validations/validationForm';
function ContactForm({pageType,contactId}) {
    const [state,dispatch]=useOperations();
    const [contacts,setContacts]=useContacts();
    const [formValidationErrors,setFromValidationErrors]=useState(initialEmptyContact);
    const [modalState,dispatchModal]=useModal();
    const [showModal,setShowModal]=useState("");
    const [resetAvatar,setResetAvatar]=useState(false);
    const [inputData,setInputData]=useState(useEditContact(contactId)||
      initialEmptyContact
    );

    // useEffect(()=>{
    //     if(!contactId)
    //         return;
    //     const editContact=contacts.filter((item)=>item.id===contactId);
    //     console.log(editContact)
    //     setInputData({...editContact});
    // },[])
    
    useEffect(()=>{
        if(pageType==="EDIT")
        {
            const res=UpdateContactRequest(contactId,state);
            if(res)
            {
                const originData=contacts.filter((item)=>item.id!==contactId);
                setContacts([...originData,state]);
            }
        }
        const res =newContactRequest(state,contacts);
        if(res)
            setContacts([...contacts,state])
    },[state])
    const changeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
      //   console.log({name,value});
        setInputData(inputData=>({...inputData,[name]:value}));
    }
    const avatarHandler=(srcImage)=>{
        setInputData(inputData=>({...inputData,image:srcImage}));
    }
    const addHandler= async()=>{
        const result=await validationFormValue(inputData);
        
        if(result==="Validated")
        {
            setFromValidationErrors(initialEmptyContact);
            const type="ADD";
            setShowModal(type);
            dispatchModal({type});
        } 
        else{
            setFromValidationErrors(result||initialEmptyContact);
        }
    }
    
    const addContactHandler=(type)=>{
     dispatch({type:type,payload:inputData});
     setShowModal("");
     setResetAvatar(true);
     setInputData(initialEmptyContact);
    }
    const editHandler= async()=>{
        const result=await validationFormValue(inputData);
        if(result==="Validated")
        {
            setFromValidationErrors(initialEmptyContact);
            const type=pageType;
            setShowModal(type);
            dispatchModal({type});
        }
        else{
            setFromValidationErrors(result||initialEmptyContact);
        }
    }
    const editContactHandler=(type)=>{
     dispatch({type:type,payload:{data:inputData,id:contactId}});
     setShowModal("");
     toast.success("The Update Infromation User Was Success!",toastOptions);
    }
    // console.log(state)
  return (
    <div className={styles.form}>
        {pageType==="EDIT"?(<h3>Edit Infromation</h3>):(<h3>Add New Contact</h3>)}
        <div className={styles.input}>
            {
                inputs.map((input,index)=>(
                    <>
                    <label>{input.name}</label>
                    <input key={index}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={inputData[input.name]}
                    onChange={changeHandler}
                    />
                    {formValidationErrors[input.name] && (<span className={styles.error}>*{formValidationErrors[input.name]}!</span>)}
                    </>
                ))
            }
            <ContactAvatar resetAvatar={resetAvatar} setResetAvatar={setResetAvatar}  avatarHandler={avatarHandler}/>
            {pageType ? (<button onClick={editHandler}><FaPen className={styles.pen} />Edit</button>):(<button onClick={addHandler}>+ Add</button>)} 
        </div>

        {showModal==="ADD"? <Modal type="ADD" functionHandler={addContactHandler} setShowModal={setShowModal}/>:null}
        {showModal==="EDIT"? <Modal type="EDIT" functionHandler={editContactHandler} setShowModal={setShowModal}/>:null}
        {/* <ToastContainer/> */}
    </div>
  )
}

export default ContactForm