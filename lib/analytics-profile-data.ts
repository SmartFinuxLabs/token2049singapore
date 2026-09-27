import participantJson from '@/data/participants.json';
import organizationJson from '@/data/organizations.json';
import {
  organizations as legacyOrganizations,
  participants as legacyParticipants,
  publicCalendarEvents,
  analyticsSnapshot,
  type MediaLinks,
} from '@/lib/token2049-public-data';

export type SourceType = 'luma' | 'linkedin' | 'official-website' | 'x' | 'telegram' | 'other';
export type Confidence = 'high' | 'medium' | 'low';

export type Provenance = {
  field: string;
  sourceType: SourceType;
  sourceUrl: string;
  sourceEvent?: string;
  verifiedAt?: string;
  confidence: Confidence;
};

export type VerifiedLocation = {
  display: string;
  city?: string;
  region?: string;
  country?: string;
  lat: number;
  lng: number;
  sourceType: SourceType;
  sourceUrl: string;
  verifiedAt?: string;
  confidence: Confidence;
};

export type AnalyticsOrganization = {
  id: string;
  name: string;
  services: string[];
  profileLocation: VerifiedLocation | null;
  eventPresence: string[];
  eventIds: string[];
  media: MediaLinks;
  provenance: Provenance[];
};

export type AnalyticsParticipant = {
  id: string;
  name: string;
  role?: string;
  specialty: string[];
  company?: string;
  profileLocation: VerifiedLocation | null;
  eventIds: string[];
  media: MediaLinks;
  relation: 'host' | 'speaker' | 'public-attendee' | 'attendee-visible';
  provenance: Provenance[];
};

type OrganizationOverlay = Partial<AnalyticsOrganization> & { id?: string; name: string };
type ParticipantOverlay = Partial<AnalyticsParticipant> & { id?: string; name: string };

const organizationOverlays = (organizationJson.records ?? []) as OrganizationOverlay[];
const participantOverlays = (participantJson.records ?? []) as ParticipantOverlay[];

function mergeMedia(base: MediaLinks, overlay?: MediaLinks): MediaLinks {
  return { ...base, ...(overlay ?? {}) };
}

function mergeOrganization(base: AnalyticsOrganization, overlay: OrganizationOverlay): AnalyticsOrganization {
  return {
    ...base,
    ...overlay,
    id: overlay.id ?? base.id,
    name: overlay.name ?? base.name,
    services: overlay.services ?? base.services,
    eventIds: overlay.eventIds ?? base.eventIds,
    eventPresence: overlay.eventPresence ?? base.eventPresence,
    media: mergeMedia(base.media, overlay.media),
    profileLocation: overlay.profileLocation ?? base.profileLocation,
    provenance: overlay.provenance ?? base.provenance,
  };
}

function mergeParticipant(base: AnalyticsParticipant, overlay: ParticipantOverlay): AnalyticsParticipant {
  return {
    ...base,
    ...overlay,
    id: overlay.id ?? base.id,
    name: overlay.name ?? base.name,
    specialty: overlay.specialty ?? base.specialty,
    eventIds: overlay.eventIds ?? base.eventIds,
    media: mergeMedia(base.media, overlay.media),
    profileLocation: overlay.profileLocation ?? base.profileLocation,
    provenance: overlay.provenance ?? base.provenance,
  };
}

const baseOrganizations: AnalyticsOrganization[] = legacyOrganizations.map((org) => ({
  ...org,
  profileLocation: null,
  provenance: [],
}));

const baseParticipants: AnalyticsParticipant[] = legacyParticipants.map((person) => ({
  id: person.id,
  name: person.name,
  role: person.role,
  specialty: person.specialty,
  company: person.company,
  profileLocation: null,
  eventIds: person.eventIds,
  media: person.media,
  relation: person.relation,
  provenance: [],
}));

export const organizations: AnalyticsOrganization[] = (() => {
  const byKey = new Map<string, AnalyticsOrganization>();
  baseOrganizations.forEach((org) => byKey.set(org.id, org));
  organizationOverlays.forEach((overlay) => {
    const key = overlay.id ?? overlay.name.toLowerCase();
    const existing = overlay.id ? byKey.get(overlay.id) : [...byKey.values()].find((org) => org.name.toLowerCase() === overlay.name.toLowerCase());
    if (existing) byKey.set(existing.id, mergeOrganization(existing, overlay));
    else byKey.set(key, {
      id: overlay.id ?? key,
      name: overlay.name,
      services: overlay.services ?? [],
      profileLocation: overlay.profileLocation ?? null,
      eventPresence: overlay.eventPresence ?? [],
      eventIds: overlay.eventIds ?? [],
      media: overlay.media ?? {},
      provenance: overlay.provenance ?? [],
    });
  });
  return [...byKey.values()];
})();

export const participants: AnalyticsParticipant[] = (() => {
  const byKey = new Map<string, AnalyticsParticipant>();
  baseParticipants.forEach((person) => byKey.set(person.id, person));
  participantOverlays.forEach((overlay) => {
    const key = overlay.id ?? overlay.name.toLowerCase();
    const existing = overlay.id ? byKey.get(overlay.id) : [...byKey.values()].find((person) => person.name.toLowerCase() === overlay.name.toLowerCase());
    if (existing) byKey.set(existing.id, mergeParticipant(existing, overlay));
    else byKey.set(key, {
      id: overlay.id ?? key,
      name: overlay.name,
      role: overlay.role,
      specialty: overlay.specialty ?? [],
      company: overlay.company,
      profileLocation: overlay.profileLocation ?? null,
      eventIds: overlay.eventIds ?? [],
      media: overlay.media ?? {},
      relation: overlay.relation ?? 'attendee-visible',
      provenance: overlay.provenance ?? [],
    });
  });
  return [...byKey.values()];
})();

export { publicCalendarEvents, analyticsSnapshot };
