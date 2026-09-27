'use client';

import { ExternalLink, MapPin } from 'lucide-react';

const venues = [
  { name: 'Marina Bay Sands', address: '10 Bayfront Ave, Singapore 018956' },
  { name: 'Conrad Singapore Marina Bay', address: '2 Temasek Blvd, Singapore 038982' },
  { name: 'Singapore Land Tower / The Exchange', address: '50 Raffles Pl, Singapore 048623' },
  { name: 'Furama RiverFront', address: '405 Havelock Rd, Singapore 169633' },
];

function googleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function RouteMap() {
  const embedUrl = 'https://www.google.com/maps?q=Marina%20Bay%2C%20Singapore&z=13&output=embed';

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <iframe
        title="TOKEN2049 Singapore venues on Google Maps"
        src={embedUrl}
        className="h-[380px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MapPin size={16} /> Key venues
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {venues.map((venue) => (
            <a
              key={venue.name}
              href={googleMapsUrl(`${venue.name}, ${venue.address}`)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm hover:border-blue-300 hover:bg-blue-50"
            >
              <span>
                <span className="block font-semibold text-slate-800">{venue.name}</span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-500">{venue.address}</span>
              </span>
              <ExternalLink size={14} className="mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600" />
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Venue links use Google Maps universal URLs, which open the Google Maps app when supported and otherwise open Google Maps in the browser.</p>
      </div>
    </div>
  );
}
