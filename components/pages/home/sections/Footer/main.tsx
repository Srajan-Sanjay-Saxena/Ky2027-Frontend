"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks";
import {
  COLORS,
  GRADIENT_FOOTER,
} from "@/components/pages/home/constants/palette";
import {
  BackgroundDecor,
  AmbientGlow,
  BrandHeader,
  FooterCard,
  BottomBar,
  socialLinks,
  quickLinks,
} from "./common";

export function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      id="footer"
      ref={footerRef}
      data-section="footer"
      className="relative pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 overflow-hidden"
      style={{ background: GRADIENT_FOOTER }}
    >
      <BackgroundDecor />

      {/* ═══ Main Content ═══ */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        {/* Brand Section - Centered Header */}
        <BrandHeader />

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-14">
          {/* Quick Links */}
          <FooterCard
            heading="॥ Explore ॥"
            mandalaClassName="footer-card-mandala"
          >
            <ul className="space-y-3 sm:space-y-4 relative z-10">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 transition-all duration-300 text-base sm:text-lg hover:tracking-wider group"
                    style={{
                      color: COLORS.CREAM,
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: "0.1em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.BRIGHT_GOLD;
                      e.currentTarget.style.textShadow =
                        "0 0 15px rgba(255,215,0,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.CREAM;
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    <span className="text-[#FF6B00] group-hover:text-[#FFD700] transition-colors duration-300">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterCard>

          {/* Contact Info */}
          <FooterCard
            heading="॥ Connect ॥"
            mandalaClassName="footer-card-mandala-reverse"
          >
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg relative z-10">
              <li className="flex items-center gap-3 justify-center">
                <span className="text-xl" style={{ color: COLORS.SAFFRON }}>
                  ✉
                </span>
                <a
                  href="mailto:contact@kashiyatra.in"
                  className="transition-all duration-300"
                  style={{
                    color: COLORS.CREAM,
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLORS.BRIGHT_GOLD;
                    e.currentTarget.style.textShadow =
                      "0 0 15px rgba(255,215,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = COLORS.CREAM;
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  contact@kashiyatra.in
                </a>
              </li>
              <li
                className="flex items-center gap-3 justify-center"
                style={{
                  color: COLORS.CREAM,
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="text-xl" style={{ color: COLORS.SAFFRON }}>
                  ⚐
                </span>
                <span>IIT BHU, Varanasi</span>
              </li>
              <li
                className="flex items-center gap-3 justify-center"
                style={{
                  color: COLORS.CREAM,
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="text-xl" style={{ color: COLORS.SAFFRON }}>
                  ✦
                </span>
                <span>January 14-17, 2027</span>
              </li>
            </ul>
          </FooterCard>

          {/* Social Links */}
          <FooterCard
            heading="॥ Follow ॥"
            mandalaClassName="footer-card-mandala"
          >
            <div className="flex gap-4 sm:gap-5 justify-center relative z-10">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `rgba(0,0,0,0.3)`,
                    border: `2px solid ${link.color}`,
                    boxShadow: `0 0 15px ${link.color}40`,
                    color: link.color,
                  }}
                  title={link.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px ${link.color}80`;
                    e.currentTarget.style.background = `${link.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 15px ${link.color}40`;
                    e.currentTarget.style.background = `rgba(0,0,0,0.3)`;
                  }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </FooterCard>
        </div>

        {/* Bottom Decorative Divider */}
        <div
          className="h-px mb-8 sm:mb-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 20%, rgba(255,215,0,0.6) 50%, rgba(255,215,0,0.4) 80%, transparent 100%)`,
          }}
        />

        {/* Bottom Bar */}
        <BottomBar />
      </div>

      <AmbientGlow />
    </footer>
  );
}
