"use client";

import { memo } from "react";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useNavbar } from "../config/NavbarContext";
import { SpiritualIcon } from "./SpiritualIcon";
import { ShineIcon } from "./ShineIcon";
import { UserAvatarDropdown } from "../common/UserAvatarDropdown";
import type { NavbarTheme } from "../types";
import { THEME_CONFIG, THEME_LAYOUT } from "../config/desktop.config";

/**
 * Theme-aware Desktop Navbar
 * Hidden on mobile (sm:flex)
 */
export const NavbarDesktop = memo(function NavbarDesktop({
  theme = "main",
}: {
  theme?: NavbarTheme;
}) {
  const { isActive, isSessionLoading, isAuthenticated, user, primaryLinks, secondaryLinks } =
    useNavbar();

  const config = THEME_CONFIG[theme];
  const linkStyle = config.linkStyle;
  const layout = THEME_LAYOUT[theme];

  return (
    <>
      {/* PRIMARY NAV — centered on the bar midline */}
      <nav
        className="absolute inset-y-0 z-10 hidden items-center justify-center gap-4 sm:flex"
        aria-label="Primary"
        style={{
          transform: `translateY(${layout.primaryLinksY})`,
          left: layout.primaryLeft,
          right: layout.primaryRight,
        }}
      >
        {primaryLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className="nav-pill group flex items-center gap-1 rounded-full px-2 py-0.5 tracking-[0.1em] whitespace-nowrap uppercase transition-all duration-300 hover:scale-[1.05] lg:gap-1.5 lg:px-2.5 lg:py-0.5"
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(8px, 0.7vw, 12px)",
                color: active ? linkStyle.activeColor : linkStyle.color,
                background: active ? linkStyle.activeBg : linkStyle.inactiveBg,
                border: active ? linkStyle.activeBorder : linkStyle.inactiveBorder,
                boxShadow: active ? linkStyle.activeShadow : linkStyle.inactiveShadow,
                textShadow: active ? linkStyle.activeTextShadow : linkStyle.inactiveTextShadow,
                transform: active ? "scale(1.08)" : undefined,
              }}
            >
              <ShineIcon theme={theme} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* SECONDARY LINKS (CONTACT + LOGIN/Avatar) with spiritual icons */}
      <div
        className="absolute inset-y-0 z-10 hidden items-center gap-4 sm:flex"
        style={{
          transform: `translateY(${layout.secondaryLinksY})`,
          right: isAuthenticated ? layout.secondaryRightAuth : layout.secondaryRight,
        }}
      >
        {secondaryLinks.map((link) => {
          const active = isActive(link.href);
          const isLoginLink = link.label === "LOGIN";

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex items-center gap-1.5 tracking-[0.1em] whitespace-nowrap uppercase transition-all duration-300 hover:scale-[1.08] lg:gap-2 ${isLoginLink ? "ml-3" : ""}`}
              style={{
                fontFamily: "var(--font-ethereal), serif",
                fontWeight: 900,
                fontSize: "clamp(8px, 0.7vw, 12px)",
                color: active ? linkStyle.activeColor : linkStyle.color,
                textShadow: active ? linkStyle.activeTextShadow : linkStyle.inactiveTextShadow,
                filter: active
                  ? `drop-shadow(0 0 6px ${theme === "main" ? "rgba(255,120,50,0.6)" : theme === "about" ? "rgba(139,92,246,0.6)" : "rgba(74,222,128,0.6)"})`
                  : undefined,
              }}
            >
              <SpiritualIcon
                kind={link.icon}
                theme={theme}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="transition-all duration-300">
                {isLoginLink && isSessionLoading ? <Spinner className="size-3" /> : link.label}
              </span>
            </Link>
          );
        })}

        {/* User Avatar (shown when logged in) */}
        {isSessionLoading ? null : isAuthenticated && user ? (
          <div className="ml-3">
            <UserAvatarDropdown user={user} />
          </div>
        ) : null}
      </div>
    </>
  );
});
