"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { LightNavbar } from "@/components/navbar/Navbar";
import {
  useMyAccount,
  useGetMyCart,
  useRemoveFromMyCart,
  useClearMyCart,
  usePasses,
} from "@/lib/api/hooks";
import { ProfileIncompleteCard } from "./components/ProfileIncompleteCard";
import { EmptyCart } from "./sections/EmptyCart";
import { CartSection } from "./sections/CartSection";
import { CartSummary } from "./sections/CartSummary";
import { CartLoader } from "./sections/loader/CartLoader";
import { LoginRequiredToast } from "./toasts/info/LoginRequiredToast";
import { ItemRemovedToast } from "./toasts/success/ItemRemovedToast";
import { CartClearedToast } from "./toasts/success/CartClearedToast";
import { COLORS } from "./constants/palette";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

export function CartPageContent() {
  const router = useRouter();
  const { status } = useSession();
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Auth & profile state
  const {
    isProfileComplete,
    completionPercentage,
    displayName,
    isLoading: isAccountLoading,
  } = useMyAccount("navbar");

  // Cart data
  const { items, totalQuantity, isEmpty, isLoading: isCartLoading, refetch } = useGetMyCart();

  // Passes data (to enrich cart items)
  const { passes } = usePasses();

  // Mutations with toasts
  const { removeFromCart, isPending: isRemoving } = useRemoveFromMyCart({
    successToast: <ItemRemovedToast />,
  });

  const { clearCart, isPending: isClearing } = useClearMyCart({
    successToast: <CartClearedToast />,
  });

  const isAuthenticated = status === "authenticated";
  const isAuthLoading = status === "loading";

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      setShowLoginToast(true);
      const timer = setTimeout(() => {
        router.push("/login?callbackUrl=/cart");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // Enrich cart items with pass details
  const enrichedItems: CartItemWithDetails[] = useMemo(() => {
    return items.map((item) => {
      const pass = passes.find((p) => p._id === item.passId);
      return {
        ...item,
        name: pass?.name ?? "Unknown Pass",
        price: pass?.price ?? 0,
        image: pass?.image ?? "/passes/YatriPass.png",
        tagline: pass?.tagline ?? "",
        accentColor: pass?.accentColor ?? COLORS.GOLD,
      };
    });
  }, [items, passes]);

  // Calculate totals
  const totalAmount = useMemo(() => {
    return enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [enrichedItems]);

  // Handlers
  const handleRemove = (passId: string) => {
    setRemovingId(passId);
    removeFromCart({ passId });
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    router.push("/checkout");
  };

  // Show loading while checking auth
  if (isAuthLoading) {
    return (
      <>
        <div className="fixed inset-x-0 top-0 z-[200]">
          <LightNavbar position="relative" topOffset={18} theme="main" />
        </div>
        <main className="min-h-screen pt-24" style={{ background: COLORS.BG_DEEP }}>
          <CartLoader />
        </main>
      </>
    );
  }

  // Show login toast for unauthenticated users
  if (!isAuthenticated) {
    return (
      <>
        <main
          className="flex min-h-screen items-center justify-center"
          style={{ background: COLORS.BG_DEEP }}
        >
          <AnimatePresence>{showLoginToast && <LoginRequiredToast />}</AnimatePresence>
        </main>
      </>
    );
  }

  // Loading account or cart
  const isLoading = isAccountLoading || isCartLoading;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[200]">
        <LightNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main className="min-h-screen pt-24 pb-12" style={{ background: COLORS.BG_DEEP }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Page header */}
          <h1
            className="mb-8 text-center text-3xl font-bold sm:text-4xl"
            style={{ color: COLORS.GOLD }}
          >
            Your Cart
          </h1>

          {isLoading ? (
            <CartLoader />
          ) : !isProfileComplete ? (
            <ProfileIncompleteCard
              completionPercentage={completionPercentage}
              displayName={displayName}
            />
          ) : isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CartSection
                  items={enrichedItems}
                  onRemove={handleRemove}
                  removingId={isRemoving ? removingId : null}
                />
              </div>
              <div>
                <CartSummary
                  totalItems={totalQuantity}
                  totalAmount={totalAmount}
                  onClearCart={handleClearCart}
                  onCheckout={handleCheckout}
                  isClearing={isClearing}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
