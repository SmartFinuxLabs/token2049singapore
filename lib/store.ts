'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Priority } from './events';

type Comment = { id: string; name: string; text: string; createdAt: string };

type ItineraryState = {
  hidden: string[];
  priorities: Record<string, Priority>;
  comments: Comment[];
  toggleHidden: (id: string) => void;
  setPriority: (id: string, priority: Priority) => void;
  addComment: (name: string, text: string) => void;
};

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set) => ({
      hidden: [],
      priorities: {},
      comments: [],
      toggleHidden: (id) => set((state) => ({
        hidden: state.hidden.includes(id) ? state.hidden.filter((x) => x !== id) : [...state.hidden, id],
      })),
      setPriority: (id, priority) => set((state) => ({ priorities: { ...state.priorities, [id]: priority } })),
      addComment: (name, text) => set((state) => ({
        comments: [{ id: crypto.randomUUID(), name, text, createdAt: new Date().toISOString() }, ...state.comments],
      })),
    }),
    { name: 'token2049-singapore-itinerary' }
  )
);
