'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { EventItem } from '@/lib/events';

declare global {
  interface Window {
    google?: any;
    gm_authFailure?: () => void;
    __token2049GoogleMapsPromise?: Promise<void>;
  }
}

function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function eventQuery(event: EventItem) {
  return event.address || `${event.location}, Singapore`;
}

function loadGoogleMaps(apiKey: string) {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (window.__token2049GoogleMapsPromise) return window.__token2049GoogleMapsPromise;

  window.__token2049GoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-token2049-google-maps]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.token2049GoogleMaps = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });

  return window.__token2049GoogleMapsPromise;
}

type RouteMapProps = {
  events?: EventItem[];
  activeEventId?: string | null;
};

export default function RouteMap({ events = [], activeEventId = null }: RouteMapProps) {
  // Normalize once so TypeScript always sees a string, while an unset/blank key still
  // cleanly falls back to the embedded Google Maps view.
  const apiKey = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '').trim();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const positionsRef = useRef<Map<string, any>>(new Map());
  const [mapError, setMapError] = useState<string | null>(null);

  const mappableEvents = useMemo(
    () => events.filter((event) => Boolean(event.address || event.location)),
    [events]
  );

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;
    let cancelled = false;

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      if (!cancelled) {
        setMapError('Google Maps rejected the API key. Check key restrictions, billing, and Maps JavaScript API access.');
      }
    };

    async function init() {
      try {
        await loadGoogleMaps(apiKey);
        if (cancelled || !mapRef.current || !window.google?.maps) return;

        const google = window.google;
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 1.2868, lng: 103.8545 },
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
        });
        mapInstanceRef.current = map;

        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current.clear();
        positionsRef.current.clear();

        await Promise.all(
          mappableEvents.map(async (event, index) => {
            try {
              const response = await geocoder.geocode({ address: eventQuery(event) });
              if (cancelled || !response.results?.length) return;
              const position = response.results[0].geometry.location;
              positionsRef.current.set(event.id, position);
              bounds.extend(position);

              const marker = new google.maps.Marker({
                map,
                position,
                title: event.title,
                label: {
                  text: String(index + 1),
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 11,
                  fillColor: '#0f172a',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                },
              });

              marker.addListener('click', () => {
                window.open(googleMapsUrl(`${event.title}, ${eventQuery(event)}`), '_blank', 'noopener,noreferrer');
              });
              markersRef.current.set(event.id, marker);
            } catch {
              // Keep the rest of the itinerary usable if one venue cannot be geocoded.
            }
          })
        );

        if (!cancelled && !bounds.isEmpty()) map.fitBounds(bounds, 48);
      } catch {
        if (!cancelled) setMapError('Interactive Google Maps could not be loaded.');
      }
    }

    init();
    return () => {
      cancelled = true;
      window.gm_authFailure = previousAuthFailure;
    };
  }, [apiKey, mappableEvents]);

  useEffect(() => {
    const google = window.google;
    if (!google?.maps || mapError) return;

    markersRef.current.forEach((marker, id) => {
      const active = id === activeEventId;
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: active ? 16 : 11,
        fillColor: active ? '#2563eb' : '#0f172a',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: active ? 3 : 2,
      });
      marker.setZIndex(active ? 1000 : undefined);
    });

    if (activeEventId) {
      const position = positionsRef.current.get(activeEventId);
      const map = mapInstanceRef.current;
      if (position && map) {
        map.panTo(position);
        if ((map.getZoom?.() ?? 0) < 14) map.setZoom(14);
      }
    }
  }, [activeEventId, mapError]);

  if (!apiKey || mapError) {
    const active = events.find((event) => event.id === activeEventId) ?? events[0];
    const query = active ? eventQuery(active) : 'Marina Bay, Singapore';
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        <iframe
          title="TOKEN2049 Singapore venues on Google Maps"
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`}
          className="h-[520px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className={`border-t p-3 text-xs leading-5 ${mapError ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
          {mapError ? mapError : <>Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable all itinerary markers and hover highlighting.</>}
          {' '}The embedded Google Map remains available as a fallback.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div ref={mapRef} className="h-[520px] w-full" aria-label="Suggested route events on Google Maps" />
      <div className="border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-500">
        All listed route events are plotted. Hover a route item to highlight and center its marker; click either the route item or marker to open Google Maps.
      </div>
    </div>
  );
}
