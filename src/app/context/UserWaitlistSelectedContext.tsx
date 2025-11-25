import { createContext, useContext, useState, ReactNode } from "react";
import { membershipDetails } from "../services/waitingListService";
import { showErrorAlert } from "../helpers/alert";

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: (userId: number) => Promise<void>;
  closeDrawer: () => void;
  payload: any;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(null); // datos enviados al drawer

  const openDrawer = async (userId:number) => {
    try {
      // aqui conectamos con el servicio que trae los datos
      let detailsMember = await membershipDetails(userId);
      if(detailsMember){
          setPayload(detailsMember);
      }
      setIsOpen(true);
    } catch (error:any) {
      showErrorAlert({title: 'Error', message: error?.message ?? ''});
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

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    console.log('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
