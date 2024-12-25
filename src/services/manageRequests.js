const BASE_URL="http://localhost:3000"
const fetchContacts= async ({signal})=>{
  let result;
  try{
    const reponse= await fetch(`${BASE_URL}/contacts`,{signal});
    const json=await reponse.json();
    result=json;
    
  }catch(error){
    console.log(error.message);
  }
  return result;
}


const newContactRequest = async (newContact,contacts) => {
  let flag=false;
  contacts.map((item)=>{
    if(item.id===newContact.id || item.id==="")
     flag=true
  })
  if(flag || newContact.id==="")
    return;

    let addedContact="";
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(newContact), 
      });
  
      if (response.ok) {
        addedContact = await response.json();
        console.log("newContact adding is Success ", addedContact);
      } else {
        console.error("newContact adding is fail", response.status);
      }
    } catch (error) {
      console.error("server has error:", error);
    }
    
    return addedContact;
  };
  const UpdateContactRequest = async (id,contact) => {
    if(!contact.firstName||!contact.lastName||!contact.email||!contact.phone)
      return;
    let updatedContact="";
    try {
      const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact), 
      });
  
      if (response.ok) {
        updatedContact = await response.json();
        console.log("contact info successfully apdated", updatedContact);
      } else {
        console.error("update info contact is fail", response.status);
      }
    } catch (error) {
      console.error("server has error", error);
    }
    return updatedContact;
  };
const deleteRequest=async (id)=>{
  let successDelete="";
  try {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      successDelete=`the contact ${id} was selected successfully deleated`;
    } else {
      console.error(`delete contact was fail`, response.status);
    }
  } catch (error) {
    console.error(`server has error`, error);
  }
  return successDelete;
}
const deleteMultipleContacts = async (contacts) => {
  for (const contact of contacts) {
    await deleteRequest(contact.id); 
  }
 
};
  export {newContactRequest,deleteRequest,deleteMultipleContacts,UpdateContactRequest,fetchContacts};
  