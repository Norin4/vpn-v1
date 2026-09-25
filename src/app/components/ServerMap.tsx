import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { MAP_H, MAP_W, landDots } from "../content/worldmap";
import { project, serverList, type Server } from "../content/servers";

const pts = serverList.map((s) => project(s.lon, s.lat));
const ZOOM = 2.1;
type VB = [number, number, number, number];
// the hub all connections leave from when a location is picked: middle of the map
const HUB: [number, number] = [500, 250];

const localTime = (tz: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());

const arc = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  const lift = Math.min(170, Math.hypot(x2 - x1, y2 - y1) * 0.4);
  return `M${x1} ${y1}Q${(x1 + x2) / 2} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
};

/**
 * Interactive server map: pick a location (list or map) and the plane tilts into 3D,
 * zooms to the city and raises a light beam over it. Hover a node for its details.
 */
export default function ServerMap() {
  const [sel, setSel] = useState<number | null>(null); // null = Best Location (overview)
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [, tick] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  // keep local times fresh
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  // Zoom by animating the SVG viewBox, not a CSS scale: the vector map is
  // re-rendered at every step and stays sharp (a scaled 3D layer is upscaled bitmap).
  const target = useMemo<VB>(() => {
    if (sel === null) return [0, 0, MAP_W, MAP_H];
    const w = MAP_W / ZOOM, h = MAP_H / ZOOM;
    const [x, y] = pts[sel];
    return [x - w / 2, y - h / 2, w, h];
  }, [sel]);
  const [vb, setVb] = useState<VB>([0, 0, MAP_W, MAP_H]);
  const vbRef = useRef<VB>(vb);

  useEffect(() => {
    const from = vbRef.current;
    const set = (v: VB) => {
      vbRef.current = v;
      setVb(v);
    };
    if (document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return set(target);
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      const e = 1 - Math.pow(1 - k, 3);
      set(from.map((f, i) => f + (target[i] - f) * e) as VB);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const rx = sel === null ? 18 : 38;
  const style = {
    transform: `rotateX(${rx + tilt.y}deg) rotateZ(${tilt.x * -0.4}deg) rotateY(${tilt.x}deg)`,
  } as CSSProperties;
  const zoom = MAP_W / vb[2];

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 8, y: ((e.clientY - r.top) / r.height - 0.5) * -6 });
  };

  const showTip = (i: number, el: SVGElement) => {
    const box = stage.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!box) return;
    setHover({ i, x: r.left + r.width / 2 - box.left, y: r.top - box.top });
  };

  const cur: Server | null = sel === null ? null : serverList[sel];

  return (
    <div className="smap">
      <div
        className="smap__stage"
        ref={stage}
        onPointerMove={onMove}
        onPointerLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHover(null);
        }}
      >
        <div className="smap__plane" style={style}>
          <svg viewBox={vb.join(" ")} className="smap__svg" aria-hidden="true" style={{ ["--zoom" as string]: zoom } as CSSProperties}>
            <defs>
              <radialGradient id="smap-glow">
                <stop offset="0" stopColor="#2a8be3" stopOpacity=".55" />
                <stop offset="1" stopColor="#2a8be3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={landDots} className="wmap__land" />
            {sel !== null && <circle cx={pts[sel][0]} cy={pts[sel][1]} r={60} fill="url(#smap-glow)" className="smap__halo" />}
            {pts.map((p, i) => (
              <path
                key={`a${i}`}
                d={arc(HUB, p)}
                className={`smap__arc${sel === i ? " is-on" : ""}`}
                pathLength={1}
              />
            ))}
            {pts.map(([x, y], i) => (
              <g key={i} className={`smap__node${sel === i ? " is-on" : ""}${sel === null ? " is-idle" : ""}`} style={{ ["--d" as string]: `${(i % 6) * 0.35}s` }}>
                <circle cx={x} cy={y} r={3.2} className="smap__dot" />
                <circle cx={x} cy={y} r={3.2} className="smap__ping" />
                <circle
                  cx={x}
                  cy={y}
                  r={11}
                  className="smap__hit"
                  onPointerEnter={(e) => showTip(i, e.currentTarget)}
                  onPointerLeave={() => setHover(null)}
                  onClick={() => setSel(i)}
                />
              </g>
            ))}
          </svg>
          {sel !== null && (
            <span
              className="smap__pin"
              style={{ left: `${((pts[sel][0] - vb[0]) / vb[2]) * 100}%`, top: `${((pts[sel][1] - vb[1]) / vb[3]) * 100}%`, ["--rx" as string]: `${-rx}deg` }}
              key={sel}
            >
              <svg viewBox="0 0 24 32" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0Z" />
                <circle cx="12" cy="11.5" r="4.6" />
              </svg>
            </span>
          )}
        </div>

        {hover && (
          <div className="smap__tip" style={{ left: hover.x, top: hover.y }} role="status">
            <span className="smap__tip-code">{serverList[hover.i].code}</span>
            <b>{serverList[hover.i].city}</b>
            <span>{serverList[hover.i].country}</span>
            <span className="smap__tip-row">Local time {localTime(serverList[hover.i].tz)}</span>
            <em>{sel === hover.i ? "Connected" : "Click to connect"}</em>
          </div>
        )}

        <div className="smap__info" aria-live="polite">
          <span className="dot-live" aria-hidden="true" />
          {cur ? (
            <span>
              <b>{cur.city}, {cur.country}</b> · secure tunnel · {localTime(cur.tz)} local
            </span>
          ) : (
            <span><b>Best Location</b> · {serverList.length} locations · fastest picked for you</span>
          )}
        </div>
      </div>

      <div className="slist">
        <div className="slist__top">
          <b>Server List</b>
          <span>Access servers around the world</span>
        </div>
        <ul role="radiogroup" aria-label="Server locations">
          <li>
            <button role="radio" aria-checked={sel === null} className={`slist__row${sel === null ? " is-on" : ""}`} onClick={() => setSel(null)}>
              <span className="slist__code">BL</span>
              <span className="slist__name">Best Location<small>Fastest server</small></span>
              <span className="slist__radio" aria-hidden="true" />
            </button>
          </li>
          {serverList.map((s, i) => (
            <li key={s.city}>
              <button
                role="radio"
                aria-checked={sel === i}
                className={`slist__row${sel === i ? " is-on" : ""}`}
                onClick={() => setSel(i)}
                onPointerEnter={() => setHover(null)}
              >
                <span className="slist__code">{s.code}</span>
                <span className="slist__name">{s.country}<small>{s.city}</small></span>
                <span className="slist__radio" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
