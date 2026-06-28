import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// alfanar SWI Kiosk — Vite + React + installable, offline-first PWA.
// The PWA plugin (Workbox) generates the service worker and web manifest.
// Everything the kiosk needs (app shell, all 4 languages, all SVG/CSS
// animations) is bundled into JS/CSS, so the default precache covers the
// entire experience — it runs with no network once installed.
export default defineConfig(({ command }) => ({
  // Served from the repo subpath on GitHub Pages, but from root in local dev.
  base: command === 'build' ? '/alfanar-catalogue-project/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg'],
      manifest: {
        name: 'alfanar — Work Instructions',
        short_name: 'alfanar SWI',
        description:
          'Standard work-instruction kiosk for the factory floor — guided, multilingual, offline.',
        lang: 'en',
        dir: 'ltr',
        display: 'fullscreen',
        orientation: 'landscape',
        background_color: '#0B2138',
        theme_color: '#0A82C6',
        categories: ['productivity', 'education', 'utilities'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Bundle is small + self-contained; precache all built assets, the step
        // photos/GIF, and the Google Fonts CSS/woff2 so the kiosk renders
        // correctly fully offline.
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,woff,woff2,ico}'],
        // The largest single asset is the ~5 MB handling-step GIF.
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { host: true },
}))
