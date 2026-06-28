import React from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import { DeviceProvider } from './device/DeviceProvider.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/screens.css'
import './styles/responsive.css'

// Service worker: auto-update keeps the kiosk fresh when it next has network;
// it already runs fully offline from the precache.
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeviceProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </DeviceProvider>
  </React.StrictMode>,
)
