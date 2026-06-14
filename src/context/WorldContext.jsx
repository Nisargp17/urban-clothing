import { createContext, useContext, useState, useCallback } from 'react';
import { WORLDS } from '../constants/worlds';

const WorldContext = createContext(null);

export function WorldProvider({ children }) {
  const [activeWorld, setActiveWorld] = useState('urban');

  const setWorld = useCallback((id) => {
    if (WORLDS[id]) {
      setActiveWorld(id);
      const world = WORLDS[id];
      const root = document.documentElement;
      root.style.setProperty('--world-bg', world.bg);
      root.style.setProperty('--world-accent', world.accent);
      root.style.setProperty('--world-text', world.text);
      root.setAttribute('data-world', id);
    }
  }, []);

  return (
    <WorldContext.Provider value={{ activeWorld, setWorld, world: WORLDS[activeWorld] }}>
      {children}
    </WorldContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorld() {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error('useWorld must be used within WorldProvider');
  return ctx;
}
