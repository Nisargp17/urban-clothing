import { createContext, useContext, useRef, useCallback } from 'react';

const KitFlyContext = createContext(null);

export function KitFlyProvider({ children }) {
  const listeners = useRef(new Set());

  const trigger = useCallback((sourceEl) => {
    if (!sourceEl) return;
    listeners.current.forEach((cb) => cb(sourceEl));
  }, []);

  const subscribe = useCallback((cb) => {
    listeners.current.add(cb);
    return () => listeners.current.delete(cb);
  }, []);

  return (
    <KitFlyContext.Provider value={{ trigger, subscribe }}>
      {children}
    </KitFlyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKitFly() {
  const ctx = useContext(KitFlyContext);
  if (!ctx) throw new Error('useKitFly must be used within KitFlyProvider');
  return ctx;
}
