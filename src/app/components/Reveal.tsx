import { createElement, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "../utils/useReveal";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  line?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};

/** Fades/lifts its content in; `line` also draws a hairline across the top. */
export default function Reveal({ as = "div", className = "", delay = 0, line, style, children, ...rest }: Props) {
  const { ref, shown } = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      className: `${line ? "line" : "rv"} ${className} ${shown ? "is-in" : ""}`.trim(),
      style: { transitionDelay: delay ? `${delay}ms` : undefined, ...style },
      ...rest,
    },
    children,
  );
}
