import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isVisible: false,
  show: () => {},
  hide: () => {},
  toggle: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible(!isVisible);

  return <SidebarContext.Provider value={{ isVisible, show, hide, toggle }}>{children}</SidebarContext.Provider>;
};
