import { createContext, useContext, useRef, useCallback } from 'react';

const FlipContext = createContext(null);

export function FlipProvider({ children }) {
  const sourceRectRef = useRef(null);
  const sourceImgRef = useRef(null);

  const captureSource = useCallback((element, imageUrl) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    sourceRectRef.current = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
    sourceImgRef.current = imageUrl;
  }, []);

  const getSource = useCallback(() => ({
    rect: sourceRectRef.current,
    imageUrl: sourceImgRef.current,
  }), []);

  const clearSource = useCallback(() => {
    sourceRectRef.current = null;
    sourceImgRef.current = null;
  }, []);

  return (
    <FlipContext.Provider value={{ captureSource, getSource, clearSource }}>
      {children}
    </FlipContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFlip() {
  const ctx = useContext(FlipContext);
  if (!ctx) throw new Error('useFlip must be used within FlipProvider');
  return ctx;
}
