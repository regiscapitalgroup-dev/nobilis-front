import { createContext, useContext, useState } from "react";
import { membershipDetails } from "../services/waitingListService";
import { showErrorAlert } from "../helpers/alert";

const DrawerContext = createContext(null);

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(null); // datos enviados al drawer

  const openDrawer = async (userId:number,callback:Function) => {
    try {
      // aqui conectamos con el servicio que trae los datos
      let detailsMember = await membershipDetails(userId);
      if(detailsMember){
          setPayload(detailsMember);
      }
      setIsOpen(true);
    } catch (error:any) {
      showErrorAlert({title: 'Error', text: error?.message ?? ''});
      setIsOpen(false);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    // setPayload();
  };

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, payload }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
