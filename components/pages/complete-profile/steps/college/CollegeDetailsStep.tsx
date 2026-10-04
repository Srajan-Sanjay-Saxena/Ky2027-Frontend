"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { GraduationCap, ArrowLeft, Loader2 } from "lucide-react";
import { useCollegeSearch, useUpdateCollege, type College } from "@/lib/api/hooks";
import { COLORS } from "@/components/pages/complete-profile/constants/palette";
import { useDebounce } from "./hooks";
import { ModeToggle } from "./ModeToggle";
import { CollegeSearchInput } from "./CollegeSearchInput";
import { CollegeDropdown } from "./CollegeDropdown";
import { SelectedCollegeCard } from "./SelectedCollegeCard";
import { ManualInput } from "./ManualInput";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface CollegeDetailsStepProps {
  onSubmit: (college: string) => void;
  onBack: () => void;
  existingCollege?: string;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function CollegeDetailsStep({
  onSubmit,
  onBack,
  existingCollege,
}: CollegeDetailsStepProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [manualCollege, setManualCollege] = useState(existingCollege || "");
  const [isManualMode, setIsManualMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // College search hook
  const { colleges, isLoading: isSearching } = useCollegeSearch(
    isManualMode ? "" : debouncedSearch,
    15
  );

  // Update college hook
  const { updateCollege, isPending: isUpdating } = useUpdateCollege(session?.user?.id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleSelectCollege = useCallback((college: College) => {
    setSelectedCollege(college);
    setSearchQuery(college.name);
    setIsDropdownOpen(false);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setSelectedCollege(null);
    setIsDropdownOpen(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedCollege(null);
  }, []);

  const handleToggleManualMode = useCallback(() => {
    setIsManualMode(true);
    setSelectedCollege(null);
    setSearchQuery("");
    setManualCollege("");
  }, []);

  const handleSubmit = useCallback(() => {
    const collegeName = isManualMode
      ? manualCollege
      : selectedCollege?.name || searchQuery;

    if (!collegeName.trim()) return;

    updateCollege(
      { body: { college: collegeName } },
      {
        onSuccess: () => {
          onSubmit(collegeName);
        },
      }
    );
  }, [isManualMode, manualCollege, selectedCollege, searchQuery, updateCollege, onSubmit]);

  const isValid = isManualMode
    ? manualCollege.trim().length >= 3
    : selectedCollege !== null || searchQuery.trim().length >= 3;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}20 0%, ${COLORS.GOLD_DARK}10 100%)`,
            border: `1px solid ${COLORS.GOLD}30`,
          }}
        >
          <GraduationCap className="h-8 w-8" style={{ color: COLORS.GOLD }} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: COLORS.CREAM }}>
          Your College Details
        </h2>
        <p style={{ color: `${COLORS.CREAM}60` }}>
          Search and select your college from our database
        </p>
      </div>

      {/* Mode Toggle */}
      <ModeToggle
        isManualMode={isManualMode}
        onSearchMode={() => setIsManualMode(false)}
        onManualMode={() => setIsManualMode(true)}
      />

      {/* College Search or Manual Input */}
      {!isManualMode ? (
        <div className="relative">
          <CollegeSearchInput
            ref={inputRef}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            onClear={handleClearSearch}
            isDropdownOpen={isDropdownOpen}
          />

          {isDropdownOpen && searchQuery.length >= 2 && (
            <CollegeDropdown
              ref={dropdownRef}
              colleges={colleges}
              isSearching={isSearching}
              onSelect={handleSelectCollege}
              onManualMode={handleToggleManualMode}
            />
          )}

          {selectedCollege && <SelectedCollegeCard college={selectedCollege} />}
        </div>
      ) : (
        <ManualInput value={manualCollege} onChange={setManualCollege} />
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
          style={{
            background: COLORS.BG_ROYAL,
            border: `1px solid ${COLORS.GOLD}30`,
            color: COLORS.CREAM,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid || isUpdating}
          className={`flex-1 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isValid && !isUpdating ? "hover:scale-[1.02] hover:shadow-lg" : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            background: isValid
              ? `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`
              : `${COLORS.GOLD}30`,
            color: isValid ? COLORS.BG_DEEP : `${COLORS.CREAM}50`,
            boxShadow: isValid ? `0 10px 40px ${COLORS.GOLD}30` : "none",
          }}
        >
          {isUpdating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
