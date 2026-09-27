'use client';

import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';

export type AnalyticsGeoPoint = {
  id: string;
  label: string;
  location: string;
  lat: number;
  lng: number;
  count: number;
  detail?: string;
  sourceUrl?: string;
  sourceType?: string;
};

export default function AnalyticsGeoMap({ points }: { points: AnalyticsGeoPoint[] }) {
  const fallbackCenter: [number, number] = [20, 0];
  const center: [number, number] = points.length > 0
    ? [points.reduce((sum, point) => sum + point.lat, 0) / points.length, points.reduce((sum, point) => sum + point.lng, 0) / points.length]
    : fallbackCenter;
  const zoom = points.length > 0 ? 2 : 1;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-[430px] w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={Math.min(22, 7 + point.count * 2.2)}
            pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.72, weight: 2 }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <div className="font-semibold">{point.label}</div>
                <div className="mt-1 text-sm">{point.location}</div>
                <div className="mt-1 text-sm">{point.count} analytics record{point.count === 1 ? '' : 's'}</div>
                {point.detail && <div className="mt-1 text-xs text-slate-500">{point.detail}</div>}
                {point.sourceUrl && <a className="mt-2 inline-block text-xs font-medium text-blue-600" href={point.sourceUrl} target="_blank" rel="noreferrer">Location source</a>}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-500">
        Geography uses verified company-profile locations for Organizations and verified personal/professional-profile locations for Participants. Event venue coordinates are never substituted. Records without a verified profile location are intentionally omitted from the map.
      </div>
    </div>
  );
}
