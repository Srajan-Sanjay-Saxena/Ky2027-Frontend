/**
 * Events Type Definitions
 * Types for event categories and sub-events in Kashi Yatra 2027
 */

// ═══════════════════════════════════════════════════════════════════
// BACKEND EVENT TYPES (matching API response)
// ═══════════════════════════════════════════════════════════════════

export type EventCategorySlug =
  | "NATRAJ"
  | "CROSSWINDZ"
  | "BANDISH"
  | "ABHINAY"
  | "MIRAGE"
  | "TOOLIKA"
  | "ENQUIZTA"
  | "SAMWAAD"
  | "ZAIKA";

export type ParticipationType = "INDIVIDUAL" | "DUO" | "TEAM";

export interface Event {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: EventCategorySlug;
  participationType: ParticipationType;
  minTeamSize: number | null;
  maxTeamSize: number | null;
  registrationOpen: boolean;
  imageUrl: string | null;
  prizePool: string | null;
}

export interface EventDetails extends Event {
  description: string | null;
  rules: string[];
  venue: string | null;
  startsAt: string | null;
  endsAt: string | null;
  registrationDeadline: string | null;
  maxParticipants: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventsApiResponse {
  statusCode: number;
  message: string;
  info: string;
  data: Event[];
}

export interface EventDetailsApiResponse {
  statusCode: number;
  message: string;
  info: string;
  data: EventDetails;
}

// ═══════════════════════════════════════════════════════════════════
// QUERY PARAMS
// ═══════════════════════════════════════════════════════════════════

export interface EventsQueryParams {
  category?: EventCategorySlug;
  participationType?: ParticipationType;
  registrationOpen?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// CATEGORY UI TYPES (for frontend display)
// ═══════════════════════════════════════════════════════════════════

/**
 * Category metadata for UI display
 * Contains display info like colors, icons, descriptions
 */
export interface EventCategory {
  id: EventCategorySlug | string; // Allow string for backward compat with lowercase slugs
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  subEvents: SubEvent[];
}

// ═══════════════════════════════════════════════════════════════════
// LEGACY TYPES (for static config - to be deprecated)
// ═══════════════════════════════════════════════════════════════════

/**
 * @deprecated Use Event type with API data instead
 * Kept for backward compatibility with static events.config.ts
 */
export interface SubEvent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: "individual" | "team" | "duo";
  teamSize?: string;
  registrationOpen: boolean;
  image?: string;
  rules?: string[];
  prizePool?: string;
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT PROP TYPES
// ═══════════════════════════════════════════════════════════════════

export interface EventCardProps {
  event: Event;
  categoryColor?: string;
  index?: number;
}

export interface EventDetailsProps {
  event: EventDetails;
}

export interface CategoryCardProps {
  category: EventCategory;
  index: number;
}

export interface SubEventCardProps {
  event: SubEvent;
  categoryColor: string;
  index: number;
}

export interface CategoryHeaderProps {
  category: EventCategory;
}

export interface CategoryPageContentProps {
  category: EventCategory;
}

export type EventType = SubEvent["type"];
