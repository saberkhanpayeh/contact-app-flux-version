import React, { createContext, useContext, useReducer } from 'react'
import { generateId } from '../helpers/helper';
const initialState={
  id:"",
 firstName:"",
 lastName:"",
 email:"",
 phone:"",
 selected:false,
 image:"",
};
const reducer=(state,action)=>{
  console.log(action);
  switch(action.type)
  {
    
    case "ADD":
      return {...action.payload,id:generateId()};
    case "EDIT": const {data,id}=action.payload;
      return{...data,id};
    default:
            throw new Error("Invalid Action!");
  }
}
const OperationsContext=createContext();
function OperationsProvider({children}) {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <OperationsContext.Provider value={{state,dispatch}}>
        {children}
    </OperationsContext.Provider>
  )
}
const useOperations=()=>{
  const {state,dispatch}=useContext(OperationsContext);
  return [state,dispatch];
}
export{useOperations};
export default OperationsProvider