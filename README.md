# Todos

A simple, beautiful todo list web app that feels native on mobile and installs as a PWA.

## Features
- Add, edit, delete, and complete tasks
- Optional due date/time with browser notification reminders
- Filter views: All / Active / Done
- Material Design 3 inspired UI
- Persists locally in your browser (`localStorage`)
- Installable to your phone's home screen

## Run locally

```bash
cd todo_app
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Install on a phone

1. Build and deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.).
2. Open the URL in Safari (iOS) or Chrome (Android).
3. Use "Add to Home Screen" — the app opens full-screen like a native app.

## Notes
- Notifications only fire while the app tab is open in a browser (browsers don't permit background notifications from a plain web app).
- Data lives in your browser only — clearing site data will erase your tasks.