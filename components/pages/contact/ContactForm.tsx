"use client";

import Image from "next/image";
import { memo, type FormEvent, useRef } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";
import { useContact } from "@/lib/api/hooks";
import { ContactSuccessToast } from "@/components/toast/success/contact";
import { ContactErrorToast } from "@/components/toast/error/contact";
import { DiyaLoader } from "@/components/loader";

const fieldStyle = {
  background: "rgba(12,8,16,0.6)",
  border: `1px solid ${COLORS.BRIGHT_GOLD}30`,
  color: COLORS.CREAM,
} as const;

// ═══════════════════════════════════════════════════════════════════
// CONTACT FORM SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactForm = memo(function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { submitContact, isPending, isSuccess } = useContact({
    successToast: <ContactSuccessToast />,
    errorToast: <ContactErrorToast />,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    submitContact({ name, email });
  }

  // Reset form on success
  if (isSuccess && formRef.current) {
    formRef.current.reset();
  }

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6">
      {/* Lotus mandala backdrop - Desktop only */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] opacity-[0.06] pointer-events-none">
        <Image
          src={IMAGES.contact.lotusMandala}
          alt=""
          fill
          className="object-contain animate-spin"
          style={{ animationDuration: "180s" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div
          className="relative p-6 sm:p-10 rounded-2xl"
          style={{
            background: `linear-gradient(160deg, ${JAZZ_COLORS.BG_ROYAL} 0%, ${JAZZ_COLORS.BG_WINE}cc 100%)`,
            border: `2px solid ${COLORS.BRIGHT_GOLD}25`,
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.4), 0 0 60px rgba(255,215,0,0.06)",
          }}
        >
          <CornerOrnaments />

          <h2
            className="text-2xl sm:text-3xl font-bold mb-2 text-center"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 2px 20px rgba(255,215,0,0.3)",
            }}
          >
            Get In Touch
          </h2>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Leave your details and our team will reach out to you.
          </p>

          <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: COLORS.GOLD }}
                >
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400/70 transition-colors"
                  style={fieldStyle}
                />
              </label>
              <label className="block">
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: COLORS.GOLD }}
                >
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400/70 transition-colors"
                  style={fieldStyle}
                />
              </label>
            </div>

            {/* Submit - refined ornate royal button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Soft outer aura on hover */}
                <div
                  className="absolute -inset-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at center, ${COLORS.BRIGHT_GOLD}55, ${COLORS.SAFFRON}25, transparent 70%)`,
                    filter: "blur(12px)",
                  }}
                />

                {/* Gold frame */}
                <div
                  className="relative rounded-xl p-[2px] transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(180deg, #FFE9A8 0%, #E8B820 40%, #B8860B 70%, #8B6914 100%)`,
                    boxShadow: `0 10px 30px rgba(255,215,0,0.3), 0 4px 12px rgba(0,0,0,0.35)`,
                  }}
                >
                  <div
                    className="relative rounded-[10px] px-10 sm:px-14 py-3.5 overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, #FFD84D 0%, #F0C020 45%, #D4A017 100%)`,
                      boxShadow: `inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.25)`,
                    }}
                  >
                    {/* Shimmer sweep - desktop only */}
                    {!isPending && (
                      <div
                        className="hidden lg:block absolute inset-0 opacity-40"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
                          animation: "shimmerSlide 3.5s infinite",
                        }}
                      />
                    )}
                    <span
                      className="relative z-10 font-black text-sm sm:text-base uppercase tracking-[0.22em] flex items-center justify-center gap-3"
                      style={{
                        color: "#3d0a18",
                        textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                      }}
                    >
                      {isPending ? (
                        <DiyaLoader text="Sending…" size="md" color="dark" />
                      ) : (
                        <>
                          {/* Gold-dark envelope glyph */}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3d0a18"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                            <path d="M3 6l9 6 9-6" />
                          </svg>
                          <span>Reach Out</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});
