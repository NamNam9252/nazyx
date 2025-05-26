// src/context/ClickContext.jsx
import { createContext, useContext, useState } from "react";

const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [clickPos, setClickPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  return (
    <ClickContext.Provider value={{ clickPos, setClickPos }}>
      {children}
    </ClickContext.Provider>
  );
};

export const useClick = () => useContext(ClickContext);
