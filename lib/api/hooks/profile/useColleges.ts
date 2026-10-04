"use client";

import { useQuery } from "@tanstack/react-query";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const COLLEGES_API_URL = "https://indian-colleges-list.vercel.app/api/institutions";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

// API response format
interface CollegeApiResponse {
  "AICTE ID": string;
  Name: string;
  District: string | null;
  "Institution Type": string;
  State: string | null;
}

// Normalized format for our app
export interface College {
  aicteId: string;
  name: string;
  district: string | null;
  institutionType: string;
  state: string | null;
}

export interface CollegesResponseData {
  colleges: College[];
  count: number;
}

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════

function normalizeCollege(apiCollege: CollegeApiResponse): College {
  return {
    aicteId: apiCollege["AICTE ID"],
    name: apiCollege.Name,
    district: apiCollege.District,
    institutionType: apiCollege["Institution Type"],
    state: apiCollege.State,
  };
}

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for searching colleges from Indian Colleges API
 * Fetches all colleges once and filters client-side for better UX
 * @param search - Search query (min 2 characters to trigger search)
 * @param limit - Max results to return (default 15)
 */
export function useCollegeSearch(search: string, limit: number = 15) {
  const { data: allColleges, isLoading: isFetching, isError, error } = useQuery<College[]>({
    queryKey: ["all-colleges"],
    queryFn: async () => {
      const response = await fetch(COLLEGES_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch colleges");
      }
      const data: CollegeApiResponse[] = await response.json();
      return data.map(normalizeCollege);
    },
    staleTime: 1000 * 60 * 60, // 1 hour - colleges don't change
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    refetchOnWindowFocus: false,
  });

  // Filter colleges based on search query
  const filteredColleges = search.length >= 2 && allColleges
    ? allColleges
        .filter((college) =>
          college.name.toLowerCase().includes(search.toLowerCase()) ||
          college.district?.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, limit)
    : [];

  return {
    colleges: filteredColleges,
    count: filteredColleges.length,
    isLoading: isFetching && search.length >= 2,
    isError,
    error,
  };
}
