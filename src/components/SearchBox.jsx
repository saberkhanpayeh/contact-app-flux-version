import React, { useEffect, useState } from 'react'
import { searchContacts } from '../helpers/helper';
import { fetchContacts } from '../services/manageRequests';
import styles from "./SearchBox.module.css";

function SearchBox({contacts,setContacts}) {
    const [search,setSearch]=useState("");
    const [originalContacts,setOriginalContacts]=useState([]);
    useEffect(() => {
      console.log("use effect original");
      const controller=new AbortController();
      const getContacts = async () => {
        try {
          const data = await fetchContacts({signal:controller.signal});
          setOriginalContacts(data);
        } catch (error) {
          console.error("Error in useEffect:", error.message);
        }
      };
  
      getContacts();
      return ()=>controller.abort();
    }, [contacts]);

    useEffect(()=>{
      // console.log(originalContacts);
      if(!search)
          {
            setContacts(originalContacts);
          }
      else
      {
        setContacts(searchContacts(search,originalContacts));
      }
    },[search]);
  return (
    <div className={styles.input}>
        <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value.toLocaleLowerCase().trim())}/>
    </div>
  )
}

export default SearchBox