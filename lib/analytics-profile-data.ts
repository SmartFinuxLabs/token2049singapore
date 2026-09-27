import participantJson from '@/data/participants.json';
import organizationJson from '@/data/organizations.json';
import lumaPublicCalendarJson from '@/data/luma-public-calendar.json';
import {
  organizations as legacyOrganizations,
  participants as legacyParticipants,
  type MediaLinks,
  type PublicCalendarEvent,
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
  relation: 'host' | 'presenter' | 'speaker' | 'public-attendee' | 'attendee-visible';
  provenance: Provenance[];
};

type OrganizationOverlay = Partial<AnalyticsOrganization> & { id?: string; name: string };
type ParticipantOverlay = Partial<AnalyticsParticipant> & { id?: string; name: string };
type LumaCalendarRecord = PublicCalendarEvent & {
  presentedBy?: string[];
  hostedBy?: string[];
  organizations?: string[];
};

type LumaEntityClassification =
  | { kind: 'organization'; name: string | null }
  | { kind: 'participant'; name: string; company?: string };

const organizationOverlays = (organizationJson.records ?? []) as OrganizationOverlay[];
const participantOverlays = (participantJson.records ?? []) as ParticipantOverlay[];
const lumaCalendarRecords = (lumaPublicCalendarJson.records ?? []) as LumaCalendarRecord[];

function mergeMedia(base: MediaLinks, overlay?: MediaLinks): MediaLinks {
  return { ...base, ...(overlay ?? {}) };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function entityKey(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function looksLikeOrganization(value: string) {
  const v = entityKey(value);
  return /(^| )(association|alliance|capital|ventures?|labs?|foundation|institute|group|network|protocol|exchange|events?|calendar|forum|collective|partners?|cloud|finance|financial|payments?|bank|wallet|markets?|systems?|technologies|community|blockchain|web3|dao|week|summit|studio|fund|vc|io)( |$)/i.test(v)
    || /\b(inc|ltd|llc|plc)\b/i.test(v)
    || /\.(io|vc)$/i.test(value.trim());
}

function classifyLumaEntity(rawName: string, explicitOrganizations: string[]): LumaEntityClassification {
  const raw = rawName.trim();
  const pipe = raw.match(/^(.+?)\s+\|\s+(.+)$/);
  if (pipe) {
    return { kind: 'participant', name: pipe[1].trim(), company: pipe[2].trim() };
  }

  const rawKey = entityKey(raw);
  const matchingOrganizations = explicitOrganizations.filter((org) => {
    const orgKey = entityKey(org);
    return orgKey === rawKey || rawKey.includes(orgKey) || orgKey.includes(rawKey);
  });

  if (matchingOrganizations.length >= 2) {
    // Compound labels such as "Haruko <> Kalshi" are already represented by
    // their normalized organization records; do not create a duplicate entity.
    return { kind: 'organization', name: null };
  }

  if (matchingOrganizations.length === 1) {
    return { kind: 'organization', name: matchingOrganizations[0] };
  }

  if (/event calendar$/i.test(raw) && explicitOrganizations.length === 1) {
    return { kind: 'organization', name: explicitOrganizations[0] };
  }

  if (looksLikeOrganization(raw)) {
    return { kind: 'organization', name: raw };
  }

  return { kind: 'participant', name: raw };
}

function lumaSource(event: LumaCalendarRecord, field: string): Provenance {
  return {
    field,
    sourceType: 'luma',
    sourceUrl: event.url,
    sourceEvent: event.name,
    verifiedAt: lumaPublicCalendarJson.fetchedAt,
    confidence: 'high',
  };
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

const baseOrganizations: AnalyticsOrganization[] = (() => {
  const byName = new Map<string, AnalyticsOrganization>();

  const addOrganization = (name: string, event: LumaCalendarRecord, field: string) => {
    const key = entityKey(name);
    const existing = byName.get(key);
    const eventIds = [...new Set([...(existing?.eventIds ?? []), event.id])];
    const eventPresence = [...new Set([...(existing?.eventPresence ?? []), event.location].filter(Boolean))];
    const source = lumaSource(event, field);

    if (existing) {
      byName.set(key, {
        ...existing,
        eventIds,
        eventPresence,
        provenance: [...existing.provenance, source],
      });
    } else {
      byName.set(key, {
        id: slugify(name),
        name,
        services: [],
        profileLocation: null,
        eventPresence,
        eventIds,
        media: {},
        provenance: [source],
      });
    }
  };

  legacyOrganizations.forEach((org) => {
    byName.set(entityKey(org.name), {
      ...org,
      profileLocation: null,
      provenance: [],
    });
  });

  lumaCalendarRecords.forEach((event) => {
    const explicitOrganizations = event.organizations ?? [];
    explicitOrganizations.forEach((name) => addOrganization(name, event, 'organizationEventAssociation'));

    const sourceFields: Array<[string, string[]]> = [
      ['presentedBy', event.presentedBy ?? []],
      ['hostedBy', event.hostedBy ?? []],
    ];

    sourceFields.forEach(([field, names]) => {
      names.forEach((rawName) => {
        const classified = classifyLumaEntity(rawName, explicitOrganizations);
        if (classified.kind === 'organization' && classified.name) {
          addOrganization(classified.name, event, field);
        }
      });
    });
  });

  return [...byName.values()];
})();

const baseParticipants: AnalyticsParticipant[] = (() => {
  const byName = new Map<string, AnalyticsParticipant>();

  legacyParticipants.forEach((person) => {
    byName.set(entityKey(person.name), {
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
    });
  });

  const addParticipant = (
    name: string,
    event: LumaCalendarRecord,
    field: 'presentedBy' | 'hostedBy',
    company?: string,
  ) => {
    const key = entityKey(name);
    const existing = byName.get(key);
    const source = lumaSource(event, field);
    const relation: AnalyticsParticipant['relation'] = field === 'presentedBy' ? 'presenter' : 'host';

    if (existing) {
      byName.set(key, {
        ...existing,
        company: existing.company ?? company,
        eventIds: [...new Set([...existing.eventIds, event.id])],
        provenance: [...existing.provenance, source],
      });
    } else {
      byName.set(key, {
        id: slugify(name),
        name,
        specialty: [],
        company,
        profileLocation: null,
        eventIds: [event.id],
        media: {},
        relation,
        provenance: [source],
      });
    }
  };

  lumaCalendarRecords.forEach((event) => {
    const explicitOrganizations = event.organizations ?? [];
    const sourceFields: Array<['presentedBy' | 'hostedBy', string[]]> = [
      ['presentedBy', event.presentedBy ?? []],
      ['hostedBy', event.hostedBy ?? []],
    ];

    sourceFields.forEach(([field, names]) => {
      names.forEach((rawName) => {
        const classified = classifyLumaEntity(rawName, explicitOrganizations);
        if (classified.kind === 'participant' && classified.name) {
          addParticipant(classified.name, event, field, classified.company);
        }
      });
    });
  });

  return [...byName.values()];
})();

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

export const publicCalendarEvents = lumaCalendarRecords as PublicCalendarEvent[];

export const analyticsSnapshot = {
  calendarName: lumaPublicCalendarJson.calendarName,
  calendarUrl: lumaPublicCalendarJson.calendarUrl,
  capturedAt: lumaPublicCalendarJson.fetchedAt,
  coverage: 'Refreshed from the public TOKEN2049 Singapore Luma calendar and event pages. Discovery evaluates both Presented by and Hosted By as entity sources: organization-like records are included in Organizations, while individual presenters and hosts are included in Participants. Ambiguous compound labels already represented by normalized organizations are deduplicated rather than guessed.',
};
