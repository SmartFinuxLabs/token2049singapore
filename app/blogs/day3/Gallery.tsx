'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { photos } from './photos';

export default function Gallery({ ids, label }: { ids: string[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const selected = photos[ids[active]];
  const move = (direction: number) => setActive((current) => (current + direction + ids.length) % ids.length);

  return (
    <div className="my-6">
      <div className={`grid gap-4 ${ids.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {ids.map((id, index) => {
          const photo = photos[id];
          return (
            <figure key={id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <button type="button" className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600" aria-label={`Enlarge: ${photo.caption}`} onClick={() => { setActive(index); dialog.current?.showModal(); }}>
                <Image src={photo.image} alt={photo.caption} sizes="(max-width: 640px) 100vw, 480px" className="aspect-[4/3] w-full object-contain" placeholder="blur" />
              </button>
              <figcaption className="px-4 py-3 text-xs leading-relaxed text-slate-600">{photo.caption}</figcaption>
            </figure>
          );
        })}
      </div>
      <dialog ref={dialog} aria-label={`${label} photo viewer`} onKeyDown={(event) => {
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
      }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="m-auto w-[95vw] max-w-6xl rounded-2xl bg-slate-950 p-4 text-white shadow-xl backdrop:bg-slate-950/85">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-xs">{label} · {active + 1} / {ids.length}</span>
          <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">Close</button>
        </div>
        {selected && <Image src={selected.image} alt={selected.caption} sizes="95vw" className="max-h-[72vh] w-full object-contain" />}
        <p className="my-3 text-sm leading-relaxed">{selected?.caption}</p>
        {ids.length > 1 && <div className="flex justify-between gap-4">
          <button type="button" onClick={() => move(-1)} className="rounded-lg border border-slate-500 px-4 py-2 text-sm">Previous</button>
          <button type="button" onClick={() => move(1)} className="rounded-lg border border-slate-500 px-4 py-2 text-sm">Next</button>
        </div>}
      </dialog>
    </div>
  );
}
