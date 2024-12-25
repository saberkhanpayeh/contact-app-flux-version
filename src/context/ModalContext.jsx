import React, { createContext, useContext, useReducer } from 'react'
const initialState={
    message:"",
    alert:"",
    cancelBtn:"",
    confirmBtn:"",
}
const reducer=(state,action)=>{
    switch(action.type){
        case "ADD":return{
            message:"add a new contact",
            alert:"are you sure!",
            cancelBtn:"cancel",
            confirmBtn:"Add",
        }
        case "GROUP_DELETE":return{
            message:"you want to delete group of contacts",
            alert:"are you sure!",
            cancelBtn:"cancel",
            confirmBtn:"Delete",
        }
        case"EDIT":return{
            message:"you want to edit Information this contact",
            alert:"are you sure!",
            cancelBtn:"cancel",
            confirmBtn:"Edit",
        }
    }
}
const ModalContext=createContext();
function ModalProvider({children}) {
    const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <ModalContext.Provider value={{state,dispatch}}>
        {children}
    </ModalContext.Provider>
  )
}

const useModal=()=>{
    const{state,dispatch}=useContext(ModalContext);
    return [state,dispatch];
}


export {useModal};
export default ModalProvider