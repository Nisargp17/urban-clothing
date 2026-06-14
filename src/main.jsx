import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'
import './styles/tokens.css'
import App from './App.jsx'
import { SeasonProvider } from './context/SeasonContext.jsx'
import { KitFlyProvider } from './context/KitFlyContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { WorldProvider } from './context/WorldContext.jsx'
import { FlipProvider } from './context/FlipContext.jsx'

// Register service worker for PWA / offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SeasonProvider>
        <WorldProvider>
          <CompareProvider>
            <FlipProvider>
              <KitFlyProvider>
                <App />
              </KitFlyProvider>
            </FlipProvider>
          </CompareProvider>
        </WorldProvider>
      </SeasonProvider>
    </Provider>
  </StrictMode>,
)
