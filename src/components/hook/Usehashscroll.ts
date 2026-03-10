"use client";

import { useRouter } from "next/navigation";

/**
 * useHashScroll
 * Returns a click handler that always scrolls to the target section,
 * even if the hash is already in the URL.
 *
 * Usage:
 *   const scrollTo = useHashScroll();
 *   <a href="#partners" onClick={scrollTo}>Partners</a>
 */
export function useHashScroll(offset = 80) {
  const router = useRouter();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const id = href.slice(1);
    const el = document.getElementById(id);

    if (el) {
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      // Update URL without triggering a navigation/re-render
      window.history.pushState(null, "", href);
    }
  };

  return scrollTo;
}