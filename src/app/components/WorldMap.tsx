import { MAP_H, MAP_W, landDots, servers } from "../content/worldmap";

// Where visitors "connect from" — arcs fly from here to the app's server cities.
const origins: [number, number][] = [
  [330, 330], // São Paulo
  [888, 118], // Tokyo
  [652, 156], // Dubai
  [205, 104], // New York area
  [760, 210], // Singapore-ish
  [925, 368], // Sydney
];
const targets = Object.values(servers);

const arc = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  const mx = (x1 + x2) / 2;
  const lift = Math.min(160, Math.hypot(x2 - x1, y2 - y1) * 0.35);
  return `M${x1} ${y1}Q${mx} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
};

/** Dotted world with server nodes and animated secure-connection arcs. */
export default function WorldMap({ className = "" }: { className?: string }) {
  return (
    <svg className={`wmap ${className}`} viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path d={landDots} className="wmap__land" />
      {origins.map((o, i) => (
        <path key={`b${i}`} d={arc(o, targets[i % targets.length])} className="wmap__base" />
      ))}
      {origins.map((o, i) => (
        <path
          key={i}
          d={arc(o, targets[i % targets.length])}
          className="wmap__arc"
          pathLength={1}
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
      {origins.map(([x, y], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={2.2} className="wmap__origin" />
      ))}
      {Object.entries(servers).map(([name, [x, y]], i) => (
        <g key={name}>
          <circle cx={x} cy={y} r={3} className="wmap__node" />
          <circle cx={x} cy={y} r={3} className="wmap__ping" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
    </svg>
  );
}
