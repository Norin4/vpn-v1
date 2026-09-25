import { useLayoutEffect, useRef, useState } from "react";

// Reveal on scroll without ever leaving content hidden.
// rAF and IntersectionObserver are throttled in hidden documents, so:
//  • a page that starts hidden renders everything in its resting state;
//  • both fallbacks are gated on real geometry, so they never reveal the
//    whole page at once (an ungated timer makes every section play on load).
export function useReveal<T extends HTMLElement>(rootMargin = "-60px") {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(
    () => typeof document !== "undefined" && document.visibilityState !== "visible",
  );

  useLayoutEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const show = () => {
      if (!done) {
        done = true;
        setShown(true);
      }
    };
    const seen = () => {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };

    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && show(), { rootMargin });
    io.observe(el);
    const onVis = () => {
      if (document.visibilityState === "hidden" && seen()) show();
    };
    document.addEventListener("visibilitychange", onVis);
    const failsafe = setTimeout(() => {
      if (seen()) show();
    }, 1200);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(failsafe);
    };
  }, [shown, rootMargin]);

  return { ref, shown };
}
