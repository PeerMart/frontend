import { Toast, type ToastMessage } from 'primereact/toast';
import React, { createContext, useContext, useRef } from 'react';

interface ToastContextType {
  show: (tm: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextType>({
  show: () => {}
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={{ show: (tm) => toast.current!.show(tm) }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};
