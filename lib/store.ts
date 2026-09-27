'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LumaStatus, Priority } from './events';

type Comment = { id: string; name: string; text: string; createdAt: string };
type StatusFilter = 'all' | LumaStatus;

type ItineraryState = {
  hidden: string[];
  priorities: Record<string, Priority>;
  comments: Comment[];
  statusFilter: StatusFilter;
  toggleHidden: (id: string) => void;
  setPriority: (id: string, priority: Priority) => void;
  setStatusFilter: (statusFilter: StatusFilter) => void;
  addComment: (name: string, text: string) => void;
};

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set) => ({
      hidden: [],
      priorities: {},
      comments: [],
      statusFilter: 'approved',
      toggleHidden: (id) => set((state) => ({
        hidden: state.hidden.includes(id) ? state.hidden.filter((x) => x !== id) : [...state.hidden, id],
      })),
      setPriority: (id, priority) => set((state) => ({ priorities: { ...state.priorities, [id]: priority } })),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      addComment: (name, text) => set((state) => ({
        comments: [{ id: crypto.randomUUID(), name, text, createdAt: new Date().toISOString() }, ...state.comments],
      })),
    }),
    {
      name: 'token2049-singapore-itinerary',
      version: 2,
      migrate: (persistedState) => ({
        ...(persistedState as Partial<ItineraryState>),
        statusFilter: 'approved',
      }),
    }
  )
);