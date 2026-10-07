/**
 * Events Type Definitions
 * Types for event categories and sub-events in Kashi Yatra 2027
 */

// ═══════════════════════════════════════════════════════════════════
// SUB-EVENT TYPES
// ═══════════════════════════════════════════════════════════════════

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

export type EventType = SubEvent["type"];

// ═══════════════════════════════════════════════════════════════════
// EVENT CATEGORY TYPES
// ═══════════════════════════════════════════════════════════════════

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string; // emoji for now, replace with actual icons later
  color: string; // accent color for the category
  image?: string; // category card image
  subEvents: SubEvent[];
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT PROP TYPES
// ═══════════════════════════════════════════════════════════════════

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
