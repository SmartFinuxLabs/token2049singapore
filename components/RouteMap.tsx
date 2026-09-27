'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const icon = L.divIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:9999px;background:#0f172a;border:3px solid #fff;box-shadow:0 0 0 2px #94a3b8"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const venues = [
  { name: 'Marina Bay Sands', pos: [1.2834, 103.8607] as [number, number] },
  { name: 'Conrad Singapore Marina Bay', pos: [1.2938, 103.8587] as [number, number] },
  { name: 'Singapore Land Tower / The Exchange', pos: [1.2844, 103.8510] as [number, number] },
  { name: 'Furama RiverFront', pos: [1.2885, 103.8355] as [number, number] },
];

export default function RouteMap() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <MapContainer center={[1.289, 103.851]} zoom={13} scrollWheelZoom={false} style={{ height: 380, width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {venues.map((venue) => (
          <Marker key={venue.name} position={venue.pos} icon={icon}>
            <Popup>{venue.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
