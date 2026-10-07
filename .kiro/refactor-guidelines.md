# Frontend Code Refactor Guidelines

## Command Trigger

When user says: "full frontend code refactor" or "refactor this page/component"

## ⚠️ IMPORTANT: Always Follow These Guidelines

**These guidelines apply to ALL code creation and modification, not just refactoring.**
Whenever creating new components, hooks, pages, or any code - follow this structure.

---

## Hooks Folder Structure

There are TWO hooks folders in the project with different purposes:

### 1. Root `/hooks/` - Global UI Hooks

Location: `/hooks/`

These are **globally reusable UI/utility hooks** that can be used anywhere in the app.

- Animation hooks (useAnimationPolicy, usePrefersReducedMotion)
- Scroll/viewport hooks (useScrollPosition, useIsMobile)
- Time-based hooks (useTimeOfDay)

```tsx
// ✅ Use for: Hooks that ANY component might need
import { useIsMobile } from "@/hooks";
import { useScrollPosition } from "@/hooks";
```

### 2. `/lib/api/hooks/` - API & Data Hooks

Location: `/lib/api/hooks/`

These are **API-related hooks** for data fetching, mutations, and authentication.

- GraphQL query hooks (useFullAccount, useProfileCompletionStatus)
- REST API hooks (usePasses, useContact)
- Auth hooks (useSignIn, useSignOut)
- Profile/data mutation hooks (useAadhaarUpload, useUpdatePhone)

```tsx
// ✅ Use for: Hooks that fetch/mutate data from backend
import { useFullAccount, usePasses } from "@/lib/api/hooks";
```

### Decision Guide: Where to put a new hook?

| Hook Type          | Location          | Example                                                   |
| ------------------ | ----------------- | --------------------------------------------------------- |
| UI state/behavior  | `/hooks/`         | useMediaQuery, useLocalStorage, useDebounce               |
| Window/DOM related | `/hooks/`         | useScrollPosition, useWindowSize, useIntersectionObserver |
| Animation/motion   | `/hooks/`         | useAnimationPolicy, usePrefersReducedMotion               |
| API data fetching  | `/lib/api/hooks/` | usePasses, useEvents, useSponsors                         |
| GraphQL queries    | `/lib/api/hooks/` | useFullAccount, useProfileCompletionStatus                |
| Authentication     | `/lib/api/hooks/` | useSignIn, useSignOut                                     |
| Form mutations     | `/lib/api/hooks/` | useUpdatePhone, useAadhaarUpload, useContact              |

**Rule of thumb:** If it talks to the backend → `/lib/api/hooks/`. If it's pure frontend utility → `/hooks/`.

---

## Helper Functions & Types

### Location: `lib/api/helper/`

All reusable types and utility functions should be organized in the helper directory:

```
lib/api/helper/
├── functions/
│   ├── error.functions.ts       # Error handling utilities
│   ├── format.functions.ts      # Formatting utilities
│   ├── validation.functions.ts  # Validation helpers
│   └── index.ts                 # Export all functions
├── types/
│   ├── profile.types.ts         # Profile-related types
│   ├── auth.types.ts            # Auth-related types
│   ├── api.types.ts             # API response types
│   └── index.ts                 # Export all types
└── index.ts                     # Main export
```

### Naming Conventions

- **Functions file:** `{domain}.functions.ts` (e.g., `error.functions.ts`)
- **Types file:** `{domain}.types.ts` (e.g., `profile.types.ts`)

### Examples

**helper/functions/error.functions.ts:**

```ts
export function extractErrorMessage(error: unknown, fallback: string): string {
  // implementation
}

export function isNetworkError(error: unknown): boolean {
  // implementation
}
```

**helper/types/profile.types.ts:**

```ts
export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export type AccountStatus = "ACTIVE" | "SUSPENDED";
```

**Usage:**

```tsx
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type { UserProfile } from "@/lib/api/helper/types/profile.types";
```

---

## API Fetching Rules

### 1. REST API Endpoints → wire-axon hooks

**For GET requests (fetching data):**

```tsx
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";

export function useSomeData() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<ResponseType>({
    queryKey: ["some-data"], // Required: unique cache key
    url: "/endpoint",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data considered fresh
      gcTime: 1000 * 60 * 30, // 30 minutes - cache garbage collection
      retry: 3, // Always use 3 retries
    },
  });

  return { data, isLoading, isError, error, refetch };
}
```

**For POST/PATCH/DELETE requests (mutations):**

```tsx
import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";

const RequestSchema = z.object({
  field: z.string(),
});

export function useUpdateSomething(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error, reset } = useApiMutation<ResponseType>({
    url: "/endpoint",
    method: "patch", // or "post", "delete"
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: RequestSchema },
    invalidateQueryName: ["query-key", userId!], // Optional: invalidate cache
    toastConfig: {
      successConfig: { message: "Success!" }, // Or { customToast: <CustomToast /> }
      errorConfig: { message: "Failed!" },
    },
    mutationOptions: { retry: 3 },
  });

  return { mutate, isPending, isSuccess, isError, error, reset };
}
```

### 2. GraphQL Endpoints → Apollo useQuery

**For GraphQL queries:**

```tsx
import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { SOME_QUERY, type SomeQueryResponse } from "@/lib/api/graphql/queries/some.queries";

export function useSomeGraphQLData() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error, refetch } = useQuery<SomeQueryResponse>(SOME_QUERY, {
    skip: !isAuthenticated, // Skip if not authenticated
    fetchPolicy: "cache-first", // Use cache, fetch if not available
  });

  return {
    data: data?.someField ?? null,
    isLoading: loading,
    isError: !!error,
    error,
    refetch,
  };
}
```

### 3. Quick Reference Table

| Data Source | HTTP Method       | Hook to Use      | Package                |
| ----------- | ----------------- | ---------------- | ---------------------- |
| REST API    | GET               | `useApiQuery`    | `wire-axon/hooks`      |
| REST API    | POST/PATCH/DELETE | `useApiMutation` | `wire-axon/hooks`      |
| GraphQL     | Query             | `useQuery`       | `@apollo/client/react` |
| GraphQL     | Mutation          | `useMutation`    | `@apollo/client/react` |

### 4. Standard Configuration Values

```ts
// Always use these defaults
const QUERY_DEFAULTS = {
  retry: 3, // 3 retries for failed requests
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
};
```

---

## Directory Structure Rules

### 1. Pages with Separate Mobile/Desktop Components

When a page renders different components for mobile vs desktop views:

```
components/pages/{page-name}/
├── {PageName}Content.tsx          # Main page wrapper
├── sections/
│   ├── mobile/                    # Mobile-only section components
│   │   ├── HeroSectionMobile.tsx
│   │   └── CardsSectionMobile.tsx
│   ├── desktop/                   # Desktop-only section components
│   │   ├── HeroSectionDesktop.tsx
│   │   └── CardsSectionDesktop.tsx
│   ├── common/                    # Shared section components (both views)
│   │   ├── FooterSection.tsx
│   │   └── CTASection.tsx
│   ├── loader/                    # Loading states
│   │   └── PageLoader.tsx
│   └── decor/                     # Decorative/visual elements only
│       ├── FloatingOrbs.tsx
│       └── BackgroundGrid.tsx
├── toasts/
│   ├── SuccessToast.tsx
│   └── ErrorToast.tsx
├── config/
│   └── data.ts                    # Configuration objects
├── data/
│   └── staticContent.ts           # Static data (arrays, objects)
├── constants/
│   └── palette.ts                 # Colors and constant values
└── index.ts                       # Exports
```

### 2. Pages WITHOUT Separate Mobile/Desktop Components

When a page uses responsive design (no separate mobile/desktop renders):

```
components/pages/{page-name}/
├── {PageName}Content.tsx          # Main page wrapper
├── sections/
│   ├── HeroSection.tsx            # Direct section files (no mobile/desktop/common)
│   ├── FeatureSection.tsx
│   ├── loader/                    # Loading states
│   │   └── PageLoader.tsx
│   └── decor/                     # Decorative elements
│       └── BackgroundEffects.tsx
├── toasts/
│   ├── SuccessToast.tsx
│   └── ErrorToast.tsx
├── config/
│   └── data.ts
├── data/
│   └── staticContent.ts
├── constants/
│   └── palette.ts
└── index.ts
```

---

## Strict Rules

### File Organization

1. **ONE COMPONENT PER FILE** - Never have 2+ components in the same file
2. **Decorative elements go in `decor/`** - Background effects, floating elements, visual-only items
3. **Loaders go in `loader/`** - All loading states and skeleton components
4. **Toasts go in `toasts/`** - Separate success and error toasts

### Imports

1. **Use `@` alias for ANYTHING outside the current folder**

   ```tsx
   // ✅ Good - importing from outside current component folder
   import { Button } from "@/components/ui/Button";
   import { COLORS } from "@/components/pages/home/constants/palette";
   import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

   // ❌ Bad - relative imports going outside current folder
   import { Button } from "../../../ui/Button";
   import { COLORS } from "../../home/constants/palette";
   ```

2. **Relative imports ONLY for same folder or direct children**

   ```tsx
   // ✅ Good - relative for same component structure
   import { HeroSection } from "./sections/HeroSection";
   import { PALETTE } from "./constants/palette";
   import { CALoader } from "./loader";

   // ❌ Bad - using relative to go up and out
   import { PALETTE } from "../home/constants/palette";
   import { extractErrorMessage } from "../../lib/api/helper/functions";
   ```

3. **Each component uses its OWN palette/loader/helpers**

   ```tsx
   // ✅ Good - using own component's palette
   // In components/pages/ca/sections/HeroSection.tsx
   import { PALETTE } from "@/components/pages/ca/constants/palette";

   // ❌ Bad - borrowing from another component's palette
   import { PALETTE } from "@/components/pages/home/constants/palette";
   ```

4. **Global helpers go in `lib/api/helper/`**
   - Reusable functions → `lib/api/helper/functions/`
   - Reusable types → `lib/api/helper/types/`
   - Page-specific helpers stay in that page's folder

5. **NO deprecated re-exports**

   ```tsx
   // ❌ Bad - deprecated aliases
   /** @deprecated Use useFullAccount */
   export const useMyAccount = useFullAccount;

   // ✅ Good - just export the new name, update usages
   export { useFullAccount } from "./useFullAccount";
   ```

6. **Index files (re-exports) - ONLY when 3+ exports**
   This applies to ALL folders: sections, components, loader, decor, toasts, constants, config, etc.

   ```tsx
   // ❌ Bad - index.ts with only 1-2 exports
   // constants/index.ts
   export * from "./palette"; // Only 1 file - don't need index.ts

   // ❌ Bad - config/index.ts with 1 export
   export * from "./ca.config"; // Only 1 file - don't need index.ts

   // ✅ Good - import directly when 1-2 files
   import { PALETTE } from "@/components/pages/ca/constants/palette";
   import { CA_CONFIG } from "@/components/pages/ca/config/ca.config";
   import { CALoader } from "@/components/pages/ca/sections/loader/CALoader";

   // ✅ Good - index.ts when 3+ exports
   // sections/index.ts (4 sections)
   export { HeroSection } from "./HeroSection";
   export { PerksSection } from "./PerksSection";
   export { TimelineSection } from "./TimelineSection";
   export { CTASection } from "./CTASection";

   // ✅ Good - constants/index.ts when 3+ files
   export * from "./palette";
   export * from "./dimensions";
   export * from "./animations";
   ```

7. **Re-exports are HIGHLY restricted**
   - Don't re-export from other components
   - Don't create wrapper exports
   - Import directly from source

### Configuration & Data

1. **`config/`** - Configuration objects, settings, feature flags

   ```ts
   // config/data.ts
   export const STEPS_CONFIG = { ... };
   export const FORM_CONFIG = { ... };
   ```

2. **`data/`** - Static content, arrays, mock data

   ```ts
   // data/staticContent.ts
   export const TESTIMONIALS = [ ... ];
   export const FAQ_ITEMS = [ ... ];
   ```

3. **`constants/`** - Colors, dimensions, constant values
   ```ts
   // constants/palette.ts
   export const PALETTE = {
     primary: "#ec4899",
     secondary: "#8b5cf6",
     background: "#0a0612",
   };

   export const BREAKPOINTS = { ... };
   export const ANIMATION_DURATIONS = { ... };
   ```

---

## Refactor Checklist

When refactoring a page, verify:

### Structure

- [ ] Each component is in its own file
- [ ] Mobile/desktop split exists IF different components are rendered per viewport
- [ ] No mobile/desktop/common folders IF page is purely responsive
- [ ] All decorative elements are in `decor/`
- [ ] All loaders are in `loader/`
- [ ] All toasts are in `toasts/` with success/error separation
- [ ] Static data is in `data/`
- [ ] Configuration is in `config/`
- [ ] Colors/constants are in `constants/palette.ts`
- [ ] Imports use `@` alias where possible
- [ ] Index file exports all public components/types

### Helper Functions & Types

- [ ] Reusable types are in `lib/api/helper/types/{domain}.types.ts`
- [ ] Utility functions are in `lib/api/helper/functions/{domain}.functions.ts`
- [ ] No inline type definitions that could be reused
- [ ] No utility functions scattered in component files

### API Fetching

- [ ] REST GET requests use `useApiQuery` from `wire-axon/hooks`
- [ ] REST POST/PATCH/DELETE use `useApiMutation` from `wire-axon/hooks`
- [ ] GraphQL queries use `useQuery` from `@apollo/client/react`
- [ ] All queries have `retry: 3`
- [ ] All REST queries have `staleTime` and `gcTime` configured
- [ ] Mutations have proper `bodyValidator` with zod schema
- [ ] Mutations have `toastConfig` for success/error feedback

---

## Example: Determining Mobile/Desktop Split

**USE mobile/desktop/common when:**

```tsx
// Page renders completely different components based on viewport
return (
  <>
    {isMobile ? <MobileHero /> : <DesktopHero />}
    {isMobile ? <MobileCards /> : <DesktopCards />}
  </>
);
```

**DON'T USE mobile/desktop/common when:**

```tsx
// Page uses Tailwind responsive classes
return (
  <div className="flex flex-col md:flex-row">
    <HeroSection /> {/* Same component, responsive styling */}
  </div>
);
```

---

## Naming Conventions

| Type            | Convention                                  | Example                                  |
| --------------- | ------------------------------------------- | ---------------------------------------- |
| Page Content    | `{PageName}Content.tsx`                     | `HomeContent.tsx`                        |
| Section         | `{Name}Section.tsx`                         | `HeroSection.tsx`                        |
| Mobile Section  | `{Name}SectionMobile.tsx`                   | `HeroSectionMobile.tsx`                  |
| Desktop Section | `{Name}SectionDesktop.tsx`                  | `HeroSectionDesktop.tsx`                 |
| Loader          | `{Page}Loader.tsx` or `{Section}Loader.tsx` | `HomeLoader.tsx`                         |
| Decor           | Descriptive name                            | `FloatingOrbs.tsx`, `GridBackground.tsx` |
| Toast           | `{Action}Toast.tsx`                         | `SuccessToast.tsx`, `ErrorToast.tsx`     |
| Palette         | `palette.ts`                                | Always `palette.ts` for colors           |
