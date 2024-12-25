import React, { useEffect, useState } from 'react'
import { contactAvatars } from '../constants/mockData';
import { getImageAddress } from '../helpers/helper';
import styles from "./ContactAvatar.module.css"
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
function ContactAvatar({resetAvatar,setResetAvatar,avatarHandler}) {
const [showAvatar,setShowAvatar]=useState(false);
const [selectAvatar,setSelectAvatar]=useState("");
useEffect(()=>{
    if(resetAvatar)
       {
       setShowAvatar(false);
        setSelectAvatar("");
       }
       setResetAvatar(false);
    //    console.log({showAvatar,selectAvatar})
},[resetAvatar]);
const avatarSelectHandler=(event)=>{
    const tagName=event.target.tagName;
    // console.log(event.target);
    if(tagName!=="IMG")
        return;
    const imageSrc=event.target.src;
    setSelectAvatar(getImageAddress(imageSrc));
    // console.log(getImageAddress(imageSrc));
} 
// console.log(selectAvatar);
// console.log(contactAvatars);
  return (
    <div className={styles.avatar}>
        <button onClick={()=>setShowAvatar(!showAvatar)}>choose your avatar{showAvatar ?(<IoMdArrowDropup />):(<IoMdArrowDropdown />)}</button>
        {
            showAvatar ?(
            <ul onClick={avatarSelectHandler}>
                {contactAvatars.map((item,index)=>(
                    <li  key={index}><img className={item===selectAvatar?styles.selected:null} 
                     onClick={()=>avatarHandler(item)} src={item} alter="contact-avatar"/>
                     </li>
                ))}
            </ul>):null
        }
    </div>

  )
}

export default ContactAvatar