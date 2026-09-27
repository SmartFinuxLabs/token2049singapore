# Connextium · TOKEN2049 Singapore 2026

Mobile-first itinerary planner for Connextium during TOKEN2049 Singapore week.

## Features

- Primary / Secondary / 3rd-option priority for overlapping events
- User hide/show preferences persisted locally with Zustand
- Drag-and-drop itinerary ordering with dnd-kit
- Subject, host, time, location, registration status and Luma/source quick-check links
- Suggested route and venue map using Leaflet + OpenStreetMap
- Native Web Share support with clipboard fallback
- Browser-local comments; no database required
- Responsive Next.js + TypeScript + Tailwind UI

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Data model

Event data lives in `lib/events.ts`, separate from the UI so the itinerary can be updated quickly as TOKEN2049 side events change.

## Data sources

Event details are compiled from organizer/Luma pages, TOKEN2049 Week, and Media Grill's TOKEN2049 side-event calendar. Event schedules, venues, approval status and capacity may change. Re-check Luma or the organizer immediately before travelling.

## Comments and social behavior

This project intentionally has no database. Comments and itinerary preferences use browser localStorage, so they persist for one browser/device only. The Share button uses the Web Share API where available.
