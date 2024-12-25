import { Routes,Route,Navigate } from "react-router-dom";
import ContactDetailPage from "./pages/ContactDetailPage"
import ContactsPage from "./pages/ContactsPage"
import EditPage from "./pages/EditPage"
import PageNotFound from "./pages/404";
import ContactProvider from "./context/ContactContext";
import OperationsProvider from "./context/OperationsContext";
import ModalProvider from "./context/ModalContext";

// json-server --watch src/server/db.json --port 3000
function App() {
  return (
    <>
    <ContactProvider>
      <OperationsProvider>
        <ModalProvider>
          <Routes>
              <Route path="/" element={<Navigate to="/contacts" replace />} />
              <Route path="/contacts" element={<ContactsPage/>} />
              <Route path="/contacts/:id" element={<ContactDetailPage/>}/>
              <Route path="/edit/:id" element={<EditPage/>}/>
              <Route path="/*" element={<PageNotFound/>} /> 
              <Route/>
            </Routes>
        </ModalProvider>
      </OperationsProvider>
    </ContactProvider>

    
  
    </>
  )
}

export default App
