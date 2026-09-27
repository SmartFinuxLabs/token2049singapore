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
};

export default function AnalyticsGeoMap({ points }: { points: AnalyticsGeoPoint[] }) {
  const center: [number, number] = [1.2921, 103.8458];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="h-[430px] w-full">
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
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-500">
        Geography represents public event presence in Singapore, not an inferred company headquarters or participant home location.
      </div>
    </div>
  );
}
