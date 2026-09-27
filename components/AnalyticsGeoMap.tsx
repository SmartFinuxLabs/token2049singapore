'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    google?: any;
    __token2049AnalyticsGoogleMapsPromise?: Promise<void>;
    __token2049AnalyticsGoogleMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}

export type AnalyticsGeoPoint = {
  id: string;
  label: string;
  location: string;
  city?: string;
  country?: string;
  lat: number;
  lng: number;
  count: number;
  detail?: string;
  sourceUrl?: string;
  sourceType?: string;
};

function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps) return Promise.resolve();
  if (window.__token2049AnalyticsGoogleMapsPromise) return window.__token2049AnalyticsGoogleMapsPromise;

  window.__token2049AnalyticsGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const callbackName = '__token2049AnalyticsGoogleMapsReady';
    const timeout = window.setTimeout(() => reject(new Error('Google Maps timed out while loading.')), 12_000);

    window[callbackName] = () => {
      window.clearTimeout(timeout);
      resolve();
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-token2049-analytics-google-map]');
    if (existing) return;

    const script = document.createElement('script');
    script.dataset.token2049AnalyticsGoogleMap = 'true';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&callback=${callbackName}&v=weekly`;
    script.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error('Google Maps failed to load.'));
    };
    document.head.appendChild(script);
  }).catch((error) => {
    window.__token2049AnalyticsGoogleMapsPromise = undefined;
    throw error;
  });

  return window.__token2049AnalyticsGoogleMapsPromise;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character] ?? character));
}

export default function AnalyticsGeoMap({ points }: { points: AnalyticsGeoPoint[] }) {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const fallbackCenter = useMemo(() => {
    if (points.length === 0) return { lat: 20, lng: 0 };
    return {
      lat: points.reduce((sum, point) => sum + point.lat, 0) / points.length,
      lng: points.reduce((sum, point) => sum + point.lng, 0) / points.length,
    };
  }, [points]);

  useEffect(() => {
    let disposed = false;

    async function renderMap() {
      setError(null);
      setLoading(true);

      if (!apiKey) {
        setLoading(false);
        setError('Google Maps API key is not configured for this deployment.');
        return;
      }

      const previousAuthFailure = window.gm_authFailure;
      window.gm_authFailure = () => {
        if (!disposed) {
          setLoading(false);
          setError(`Google Maps rejected this browser key for ${window.location.origin}. Check API and HTTP referrer restrictions.`);
        }
      };

      try {
        await loadGoogleMaps(apiKey);
        if (disposed || !mapElement.current || !window.google?.maps) return;

        const google = window.google;
        const map = new google.maps.Map(mapElement.current, {
          center: fallbackCenter,
          zoom: points.length ? 2 : 1,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
        });

        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        points.forEach((point) => {
          const position = { lat: point.lat, lng: point.lng };
          bounds.extend(position);

          const marker = new google.maps.Marker({
            position,
            map,
            title: `${point.label} · ${point.count}`,
            label: {
              text: String(point.count),
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#2563eb',
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2,
              scale: Math.min(18, 8 + Math.sqrt(point.count) * 2),
            },
          });

          marker.addListener('click', () => {
            const source = point.sourceUrl
              ? `<div style="margin-top:8px"><a href="${escapeHtml(point.sourceUrl)}" target="_blank" rel="noreferrer" style="color:#2563eb;font-size:12px;font-weight:600">Location source</a></div>`
              : '';
            const detail = point.detail ? `<div style="margin-top:6px;color:#64748b;font-size:12px">${escapeHtml(point.detail)}</div>` : '';
            infoWindow.setContent(`
              <div style="min-width:190px;max-width:280px;padding:2px 0">
                <div style="font-weight:700;color:#0f172a">${escapeHtml(point.label)}</div>
                <div style="margin-top:4px;font-size:13px;color:#334155">${point.count} ${point.count === 1 ? 'record' : 'records'} in this city</div>
                ${detail}
                ${source}
              </div>
            `);
            infoWindow.open({ map, anchor: marker });
          });
        });

        if (points.length === 1) {
          map.setCenter({ lat: points[0].lat, lng: points[0].lng });
          map.setZoom(7);
        } else if (points.length > 1) {
          map.fitBounds(bounds, 56);
          google.maps.event.addListenerOnce(map, 'idle', () => {
            if ((map.getZoom() ?? 2) > 8) map.setZoom(8);
          });
        }

        if (!disposed) setLoading(false);
      } catch (cause) {
        if (!disposed) {
          setLoading(false);
          setError(cause instanceof Error ? cause.message : 'Google Maps could not be initialized.');
        }
      }

      return () => {
        window.gm_authFailure = previousAuthFailure;
      };
    }

    const cleanupPromise = renderMap();
    return () => {
      disposed = true;
      void cleanupPromise;
    };
  }, [apiKey, fallbackCenter, points]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-[430px] w-full bg-slate-100">
        <div ref={mapElement} className="h-full w-full" aria-label="Google map of verified profile locations grouped by city" />
        {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/75 text-sm font-medium text-slate-500">Loading Google Maps…</div>}
        {error && (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900 shadow-sm">
            {error}
          </div>
        )}
        {!loading && !error && points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 px-8 text-center text-sm text-slate-500">No verified city-level profile locations are available for the current filters.</div>
        )}
      </div>
      <div className="border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-500">
        Google Maps groups Organizations and Participants by verified profile city. Organization cities come from company-profile sources; participant cities come from the participant’s own professional/public profile. Event venues are never used as substitutes.
      </div>
    </div>
  );
}
