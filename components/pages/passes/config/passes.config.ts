/**
 * Pass configuration for Kashiyatra'26
 * Central source of truth for pass data, pricing, and animation settings
 */

import { IMAGES } from "@/lib/images";
import type { PassBenefit, PassDetailItem, PassConfig } from "@/lib/api/helper/types";

// Re-export so existing consumers importing from this config path keep working.
export type { PassBenefit, PassDetailItem, PassConfig };

export const PASSES: PassConfig[] = [
  {
    id: "yatri",
    name: "Yatri Pass",
    price: 2399,
    image: IMAGES.passes.yatri,
    tagline: "Begin Your Journey",
    accentColor: "#1A5F7A", // Ganga blue
    glowColor: "rgba(26, 95, 122, 0.5)",
    benefits: [
      { text: "Event Entry Only" },
      { text: "All Cultural Events" },
      { text: "IIT BHU Campus Access" },
      { text: "Festival Merchandise (Basic)" },
    ],
    details: [
      {
        icon: "🎤",
        title: "Pro Nights Entry",
        description: "Exclusive access to all professional artist performances and star nights",
      },
      {
        icon: "🎁",
        title: "Welcome Kit",
        description:
          "Festival welcome kit with essentials, ID card, and exclusive Kashi Yatra merchandise",
      },
      {
        icon: "🏛️",
        title: "Campus Tour",
        description: "Free guided tour of the historic IIT BHU campus and its heritage buildings",
      },
      {
        icon: "🎭",
        title: "All Cultural Events",
        description: "Entry to all cultural performances, competitions, and exhibitions",
      },
    ],
  },
  {
    id: "darbar",
    name: "Darbar Pass",
    price: 2699,
    image: IMAGES.passes.darbar,
    tagline: "The Royal Experience",
    accentColor: "#D4A853", // Gold
    glowColor: "rgba(212, 168, 83, 0.5)",
    popular: true,
    benefits: [
      { text: "All Yatri Benefits", highlight: true },
      { text: "Pro-Night Shows Access" },
      { text: "Priority Seating" },
      { text: "Exclusive Workshops" },
      { text: "Festival Kit" },
    ],
    details: [
      {
        icon: "🍽️",
        title: "Complimentary Meals",
        description: "Free food throughout the festival - breakfast, lunch, and dinner included",
      },
      {
        icon: "🎤",
        title: "Pro Nights Entry",
        description: "Premium access to all professional artist performances with priority seating",
      },
      {
        icon: "🏛️",
        title: "Campus Tour",
        description: "Free guided tour with exclusive backstage access to event venues",
      },
      {
        icon: "🎁",
        title: "Premium Festival Kit",
        description: "Exclusive Darbar kit with premium merchandise, souvenirs, and memorabilia",
      },
      {
        icon: "🎯",
        title: "Priority Registration",
        description:
          "Skip the queues with priority registration for all competitions and workshops",
      },
    ],
  },
  {
    id: "swarnim",
    name: "Swarnim Pass",
    price: 2999,
    image: IMAGES.passes.swarnim,
    tagline: "The Divine Experience",
    accentColor: "#FFD700", // Bright gold
    glowColor: "rgba(255, 215, 0, 0.5)",
    benefits: [
      { text: "All Darbar Benefits", highlight: true },
      { text: "VIP Lounge Access" },
      { text: "Front Row Seating" },
      { text: "Meet & Greet with Artists" },
      { text: "Premium Merch Kit" },
      { text: "Complimentary Refreshments" },
    ],
    details: [
      {
        icon: "🏨",
        title: "Free Accommodation",
        description: "Comfortable stay in IIT BHU hostels for the entire festival duration",
      },
      {
        icon: "🍽️",
        title: "All Meals Included",
        description: "Premium dining experience with all meals and refreshments covered",
      },
      {
        icon: "👑",
        title: "VIP Lounge Access",
        description: "Exclusive access to the VIP lounge with premium amenities and refreshments",
      },
      {
        icon: "🎤",
        title: "Front Row + Meet & Greet",
        description:
          "Front row seating at all events plus exclusive meet & greet with performing artists",
      },
      {
        icon: "🎁",
        title: "Swarnim Premium Kit",
        description:
          "Ultimate festival kit with limited edition merchandise and exclusive collectibles",
      },
      {
        icon: "🚗",
        title: "Airport/Station Pickup",
        description: "Complimentary pickup and drop service from Varanasi airport/railway station",
      },
    ],
  },
] as const;

/**
 * Animation configuration - tune these values to adjust feel
 */
export const ANIMATION = {
  // Card entry animation
  stagger: {
    delayChildren: 0.2,
    staggerChildren: 0.15,
  },

  // Container variants for section animations
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15, when: "beforeChildren" },
    },
  },

  // Card variants
  card: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
    },
  },

  // Pass image floating
  float: {
    duration: 3,
    ease: [0.45, 0.05, 0.55, 0.95] as const, // easeInOut
    repeat: Infinity,
    repeatType: "reverse" as const,
  },

  // Hover effects
  hover: {
    scale: 1.03,
    y: -12,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }, // easeOut
  },

  // Image hover
  imageHover: {
    scale: 1.08,
    transition: { duration: 0.3 },
  },

  // Button shimmer
  shimmer: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  },
} as const;

/**
 * Responsive breakpoints for pass card sizing
 */
export const CARD_SIZES = {
  mobile: {
    width: "100%",
    imageHeight: 280,
  },
  tablet: {
    width: "300px",
    imageHeight: 320,
  },
  desktop: {
    width: "340px",
    imageHeight: 380,
  },
} as const;
