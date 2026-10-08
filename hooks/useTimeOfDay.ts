"use client";

import { useState, useEffect } from "react";
import {
  type TimeOfDay,
  TIME_GRADIENTS,
  SHOW_MOON,
  SHOW_STARS,
  STARS_OPACITY,
  getTimeOfDay,
} from "@/components/pages/home/constants/palette";

interface TimeOfDayState {
  timeOfDay: TimeOfDay;
  gradient: string;
  showMoon: boolean;
  showStars: boolean;
  starsOpacity: number;
  hour: number;
}

// ⚠️ DEV OVERRIDE: Set to a specific time period for testing, or null for real time
// Options: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'dusk' | 'night' | null
const DEV_TIME_OVERRIDE: TimeOfDay | null = null; // Change to null for production

/**
 * Hook that returns current time of day and associated sky configuration.
 * Updates every minute to check for time period changes.
 *
 * Time periods:
 * - Dawn:      5:00 - 7:00
 * - Morning:   7:00 - 11:00
 * - Afternoon: 11:00 - 16:00
 * - Evening:   16:00 - 19:00
 * - Dusk:      19:00 - 21:00
 * - Night:     21:00 - 5:00
 */
export function useTimeOfDay(): TimeOfDayState {
  const [state, setState] = useState<TimeOfDayState>(() => {
    // SSR DEFAULT (intentional): The server cannot know the visitor's local
    // clock, so there is no server-correct value for time-of-day. We seed with
    // "night" and switch to the real local time in the effect below after
    // hydration. For visitors whose local time is NOT night, this produces a
    // brief night -> actual-time transition on first paint.
    //
    // This is an accepted SSR limitation. We deliberately do NOT gate the hero
    // behind a loading/hidden state (options considered: hide-until-hydrated,
    // loading state), because the hero is the primary above-the-fold content
    // (with a `priority` temple image) and blanking it would hurt perceived
    // performance / LCP more than the transition hurts. Instead, the Hero
    // section mitigates the visual by animating the change: the sky gradient
    // uses `transition: background 2s ease-in-out`, stars use a 2s opacity
    // fade, and the celestial body uses a 1s transition — so the shift reads
    // as a smooth sunrise/sunset sweep rather than a hard flicker.
    //
    // Use the dev override if set, otherwise default to night for SSR.
    const defaultTime: TimeOfDay = DEV_TIME_OVERRIDE ?? "night";
    return {
      timeOfDay: defaultTime,
      gradient: TIME_GRADIENTS[defaultTime],
      showMoon: SHOW_MOON[defaultTime],
      showStars: SHOW_STARS[defaultTime],
      starsOpacity: STARS_OPACITY[defaultTime],
      hour: 12,
    };
  });

  useEffect(() => {
    // If DEV override is set, don't update based on real time
    if (DEV_TIME_OVERRIDE) return;

    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const timeOfDay = getTimeOfDay(hour);

      setState({
        timeOfDay,
        gradient: TIME_GRADIENTS[timeOfDay],
        showMoon: SHOW_MOON[timeOfDay],
        showStars: SHOW_STARS[timeOfDay],
        starsOpacity: STARS_OPACITY[timeOfDay],
        hour,
      });
    };

    // Set initial value
    updateTime();

    // Update every minute to check for time period changes
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
}
