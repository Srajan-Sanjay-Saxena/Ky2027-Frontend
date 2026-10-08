"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
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
        <main className="min-h-screen pt-32" style={{ background: COLORS.BG_DEEP }}>
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

      <main
        className="relative min-h-screen pt-32 pb-12 sm:pt-36"
        style={{ background: COLORS.BG_DEEP }}
      >
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
            style={{ background: COLORS.GOLD }}
          />
          <div
            className="absolute top-1/3 -right-40 h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{ background: COLORS.MAROON }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            {/* Icon and Title */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.DARK_GOLD}30)`,
                  border: `2px solid ${COLORS.GOLD}40`,
                }}
              >
                <ShoppingBag className="h-6 w-6" style={{ color: COLORS.GOLD }} />
              </div>
              <h1
                className="text-3xl font-bold sm:text-4xl lg:text-5xl"
                style={{
                  color: COLORS.GOLD,
                  fontFamily: "var(--font-ethereal), serif",
                  textShadow: `0 0 30px ${COLORS.GOLD}40`,
                }}
              >
                Your Cart
              </h1>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2">
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS.GOLD})` }}
              />
              <Sparkles className="h-4 w-4" style={{ color: COLORS.GOLD }} />
              <div
                className="h-px w-16 sm:w-24"
                style={{ background: `linear-gradient(90deg, ${COLORS.GOLD}, transparent)` }}
              />
            </div>

            {/* Subtitle */}
            {!isLoading && !isEmpty && isProfileComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-400"
              >
                You have{" "}
                <span className="font-semibold" style={{ color: COLORS.GOLD }}>
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </motion.p>
            )}
          </motion.div>

          {isLoading ? (
            <CartLoader />
          ) : !isProfileComplete ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ProfileIncompleteCard
                completionPercentage={completionPercentage}
                displayName={displayName}
              />
            </motion.div>
          ) : isEmpty ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <EmptyCart />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8 lg:grid-cols-3"
            >
              <div className="lg:col-span-2">
                <CartSection
                  items={enrichedItems}
                  onRemove={handleRemove}
                  removingId={isRemoving ? removingId : null}
                />
              </div>
              <div className="lg:sticky lg:top-32 lg:h-fit">
                <CartSummary
                  totalItems={totalQuantity}
                  totalAmount={totalAmount}
                  onClearCart={handleClearCart}
                  onCheckout={handleCheckout}
                  isClearing={isClearing}
                />
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
