import { v4 } from "uuid"

const generateId=()=>{
    const newId=v4();
    return newId;
}

const isUserSelect=(data)=>{
    const selectItems=data.filter((item)=>item.selected===true);
    return selectItems;
}
const notUserSelect=(data)=>{
    const notSelectItems=data.filter((item)=>item.selected===false);
    return notSelectItems;
}

const getImageAddress=(src)=>{
    const originalString = src.toString();
    const stringToRemove = "http://localhost:5173";
    const result = originalString.replace(stringToRemove, "");
    return result; 
}
const searchContacts=(search,contacts)=>{

    const searchName=contacts.filter((contact)=>(contact.firstName.includes(search)||contact.lastName.includes(search))
        );
        //console.log(searchName);
    const searchMail=contacts.filter((contact)=>(contact.email.includes(search)));
    const searchPhone=contacts.filter((contact)=>(contact.phone.includes(search)));
    if(searchName.length>=searchMail.length && searchName.length>searchPhone.length)
        return searchName;
    else if(searchMail.length>=searchName.length && searchMail.length>searchPhone.length)
        return searchMail;
    else{
        return searchPhone;
    } 

}

export{generateId,isUserSelect,notUserSelect,getImageAddress,searchContacts};