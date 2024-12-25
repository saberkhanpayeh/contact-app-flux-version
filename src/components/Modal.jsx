import { LuOctagonAlert } from "react-icons/lu";
import { useModal } from "../context/ModalContext"
import styles from "./Modal.module.css";

function Modal({type,functionHandler,setShowModal}) {
    const [modalState,dispatchModal]=useModal();
    // console.log(modalState);
  return (
    <div className={styles.container}>
      <div><LuOctagonAlert /></div>
    <div className={styles.message}>
        <p>{modalState.message}</p>
        <p>{modalState.alert}</p>
    </div>
    <div className={styles.btn}>
      <button onClick={()=>setShowModal("")} >{modalState.cancelBtn}</button>
      <button onClick={()=>functionHandler(type)}>{modalState.confirmBtn}</button>
    </div>

</div>
  )
}

export default Modal