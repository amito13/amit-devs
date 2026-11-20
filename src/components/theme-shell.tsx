"use client";

import { useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

const SWEEP_MS = 700;

export function ThemeShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const next = theme === "dark" ? "light" : "dark";

  function toggleTheme() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Browsers without the View Transitions API (or reduced motion) just swap instantly.
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    // Diagonal sweep: a wedge pinned off-screen beyond the top-right corner (where the
    // toggle sits) fans out across the page. The end triangle covers the whole viewport.
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              "polygon(200% -100%, 200% -100%, 200% -100%)",
              "polygon(200% -100%, -150% 0%, 200% 250%)",
            ],
          },
          {
            duration: SWEEP_MS,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        // Transition was skipped (e.g. tab hidden); the theme has still been applied.
      });
  }

  return (
    <main className="portfolio-shell" data-theme={theme}>
      <button
        aria-label={`Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
        className="theme-toggle"
        onClick={toggleTheme}
        type="button"
      >
        <svg
          key={theme}
          className="theme-toggle__icon"
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {theme === "dark" ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </>
          ) : (
            <path d="M20.9 13.3A9 9 0 0 1 10.7 3.1a9 9 0 1 0 10.2 10.2Z" />
          )}
        </svg>
      </button>

      {children}
    </main>
  );
}
