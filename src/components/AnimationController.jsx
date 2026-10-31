"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Page-wide animation state.
 *
 * The controller watches the document scroll position and flips
 * `html[data-animations]` to "halted" the moment the viewport is parked at the
 * end of the page. Decorative CSS keyframes freeze in place through the rule
 * appended to globals.css. Review marquee and CTA glints remain live, and
 * count-ups subscribe to this state through useCountUp.
 *
 * Scrolling back up releases the pause; a full page refresh reloads the
 * document, so every animation restarts from its first frame. The inline
 * script in app/layout.js disables the browser's scroll restoration on reload
 * so a refresh also replays the entrance reveals from the top.
 */

const AnimationStateContext = createContext({ atBottom: false, halted: false });

export function useAnimationState() {
  return useContext(AnimationStateContext);
}

/*
 * Count from 0 to `target` once per mount, including when the page is parked
 * at the end of the document.
 */
export function useCountUp(target, duration = 1800, enabled = true) {
  const [value, setValue] = useState(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;
    if (elapsedRef.current >= duration) return undefined;

    let frame;
    let previous = null;

    const tick = (now) => {
      if (previous === null) previous = now;
      elapsedRef.current = Math.min(elapsedRef.current + (now - previous), duration);
      previous = now;
      setValue(target * (elapsedRef.current / duration));
      if (elapsedRef.current < duration) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, target, enabled]);

  return value;
}

export default function AnimationController({ children }) {
  const pathname = usePathname();
  const [atBottom, setAtBottom] = useState(false);
  const atBottomRef = useRef(false);
  const frameRef = useRef(0);

  /* A browser refresh should behave like a first visit: start at the top so the
     whole timeline plays again. The inline script handles this before paint;
     this effect is a safety net for browsers that ignore it. */
  useEffect(() => {
    const navigation = performance.getEntriesByType?.("navigation")?.[0];
    const isReload =
      navigation?.type === "reload" ||
      (navigation === undefined && performance.navigation?.type === 1);
    if (!isReload) return undefined;

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search
      );
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
    const frame = requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
    });

    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  /* A normal client-side navigation (e.g. footer "Join our team") does not
     restore the previous scroll position, so without this the new page loads
     still scrolled to the old footer and the user never sees the top. */
  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
    const frame = requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
    });
    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  /* Re-measure whenever the route changes, the viewport changes, or content
     (fonts, images, lazy sections) makes the document taller or shorter. */
  useEffect(() => {
    const root = document.documentElement;

    const measure = () => {
      frameRef.current = 0;
      const maxScroll = root.scrollHeight - window.innerHeight;
      const isAtBottom = maxScroll > 8 && window.scrollY >= maxScroll - 2;

      if (isAtBottom === atBottomRef.current) return;

      atBottomRef.current = isAtBottom;
      setAtBottom(isAtBottom);
      root.dataset.animations = isAtBottom ? "halted" : "running";
    };

    const schedule = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(measure);
    };

    root.dataset.animations = atBottomRef.current ? "halted" : "running";
    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      resizeObserver.disconnect();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      delete root.dataset.animations;
    };
  }, [pathname]);

  const value = useMemo(() => ({ atBottom, halted: atBottom }), [atBottom]);

  return (
    <AnimationStateContext.Provider value={value}>{children}</AnimationStateContext.Provider>
  );
}
