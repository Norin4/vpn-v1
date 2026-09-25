import type { CSSProperties, ReactNode } from "react";

/** Endless strip: content is rendered twice and slides by one copy width. */
export default function Marquee({
  children,
  time = 40,
  reverse,
  className = "",
  label,
}: {
  children: ReactNode;
  time?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
}) {
  const style = { ["--time" as string]: `${time}s` } as CSSProperties;
  return (
    <div className={`marquee ${reverse ? "marquee--right" : ""} ${className}`} style={style} role={label ? "img" : undefined} aria-label={label}>
      <div className="marquee__inner" aria-hidden={label ? true : undefined}>{children}</div>
      <div className="marquee__inner" aria-hidden="true">{children}</div>
    </div>
  );
}
