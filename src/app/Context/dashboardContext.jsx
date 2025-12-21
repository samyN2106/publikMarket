"use client";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

// exportation de la fonction DashContext
export const useDashboardContext = () => useContext(DashboardContext);

export const DashBoardProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <DashboardContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};
