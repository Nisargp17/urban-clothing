import { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([]);

  const toggle = useCallback((productId) => {
    setIds((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= 4) return prev; // Max 4
      return [...prev, productId];
    });
  }, []);

  const isSelected = useCallback((productId) => ids.includes(productId), [ids]);
  const clear = useCallback(() => setIds([]), []);
  const remove = useCallback((productId) => setIds((prev) => prev.filter((id) => id !== productId)), []);

  return (
    <CompareContext.Provider value={{ ids, toggle, isSelected, clear, remove, count: ids.length }}>
      {children}
    </CompareContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
