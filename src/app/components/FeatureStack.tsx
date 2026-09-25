import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type Slide = { key: string; media: ReactNode; body: ReactNode; photo?: boolean };

/**
 * Pinned horizontal deck: scrolling down slides the next card in from the right
 * over the previous one, which shrinks, shifts left and dims underneath.
 */
export default function FeatureStack({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLElement>(null);
  const [p, setP] = useState(0); // 0 … n-1
  const n = slides.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (range || 1))) * (n - 1));
    };
    const on = () => {
      if (document.hidden) update();
      else if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  const go = (k: number) => {
    const el = track.current;
    if (!el) return;
    const range = el.offsetHeight - innerHeight;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY + (k / (n - 1)) * range, behavior: "smooth" });
  };
  const cur = Math.round(p);

  return (
    <section className="fstack" ref={track} style={{ height: `${n * 90 + 20}vh` }} aria-label="Features">
      <div className="fstack__sticky">
        <div className="container fstack__frame">
          {slides.map((s, k) => {
            const enter = Math.min(1, Math.max(0, p - (k - 1))); // 0 → 1 while sliding in
            const under = Math.min(1, Math.max(0, p - k)); // 0 → 1 while being covered
            const style = {
              zIndex: k + 1,
              transform:
                k === 0 || enter >= 1
                  ? `translateX(${-6 * under}%) scale(${1 - 0.08 * under})`
                  : `translateX(${(1 - enter) * 104}%)`,
              // fade instead of darkening; cards two layers deep disappear so they don't bleed through
              opacity: p - k <= 1 ? 1 - 0.5 * under : Math.max(0, 0.5 - (p - k - 1)),
              visibility: k > 0 && enter <= 0 ? "hidden" : "visible",
            } as CSSProperties;
            return (
              <article className={`fstack__card${s.photo ? " fstack__card--photo" : ""}`} key={s.key} style={style} aria-hidden={cur !== k}>
                <div className="fstack__media">{s.media}</div>
                <div className="fstack__body">{s.body}</div>
              </article>
            );
          })}
        </div>
        <div className="container fstack__nav">
          <span className="fstack__count">
            {String(cur + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <div className="fstack__bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${n > 1 ? p / (n - 1) : 1})` }} />
          </div>
          <div className="nav-arrows" style={{ marginTop: 0 }}>
            <button className="nav-arrow" aria-label="Previous feature" disabled={cur === 0} onClick={() => go(cur - 1)}>
              <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
            <button className="nav-arrow" aria-label="Next feature" disabled={cur === n - 1} onClick={() => go(cur + 1)}>
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
