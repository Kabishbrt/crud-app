import React, { createContext, useState, useContext } from 'react';
import { loadFromLocalStorage } from '../utils/LocalStorage';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(() => loadFromLocalStorage());

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
export const useDataContext = () => useContext(DataContext);
