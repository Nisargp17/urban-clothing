import { createContext, useContext, useState, useEffect } from 'react';

const SEASONS = ['ss25', 'aw25', 'future'];
const DEFAULT_SEASON = 'ss25';

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [season, setSeasonState] = useState(() => {
    // Auto-detect from URL path: /ss25/... /aw25/...
    const pathMatch = window.location.pathname.match(/^\/(ss25|aw25|future)/);
    if (pathMatch) return pathMatch[1];

    // Or from localStorage preference
    const saved = localStorage.getItem('uc-season');
    if (saved && SEASONS.includes(saved)) return saved;

    return DEFAULT_SEASON;
  });

  const setSeason = (newSeason) => {
    if (!SEASONS.includes(newSeason)) return;
    setSeasonState(newSeason);
    localStorage.setItem('uc-season', newSeason);
  };

  // Apply data-season to <html> for CSS selectors
  useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
  }, [season]);

  return (
    <SeasonContext.Provider value={{ season, setSeason, seasons: SEASONS }}>
      {children}
    </SeasonContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error('useSeason must be used within SeasonProvider');
  return ctx;
}
