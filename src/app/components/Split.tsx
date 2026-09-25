import { createElement, Fragment } from "react";
import { useReveal } from "../utils/useReveal";

/**
 * Headline that rises in character by character (reference hero effect).
 * `parts` is a list of [text, italic?] runs so accent words can use the serif.
 * The space between words sits BETWEEN the inline-block word spans — a
 * trailing space inside an inline-block is dropped and words would run together.
 */
export default function Split({
  parts,
  as = "h1",
  className = "",
  extra = 0.2,
}: {
  parts: [string, boolean?][];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  extra?: number;
}) {
  const { ref, shown } = useReveal<HTMLElement>("0px");
  const label = parts.map(([t]) => t).join(" ").replace(/\s+/g, " ").trim();
  // a part that is exactly "\n" forces a line break
  let ci = 0;
  const words = parts.flatMap(([text, italic]) =>
    text === "\n" ? [{ w: "\n", italic }] : text.split(/\s+/).filter(Boolean).map((w) => ({ w, italic })),
  );

  return createElement(
    as,
    {
      ref,
      className: `split ${className} ${shown ? "is-in" : ""}`,
      "aria-label": label,
      style: { ["--extra" as string]: `${extra}s` },
    },
    <span aria-hidden="true">
      {words.map(({ w, italic }, wi) =>
        w === "\n" ? (
          <br key={wi} />
        ) : (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <span className={`w${italic ? " i" : ""}`}>
            {[...w].map((ch) => (
              <span key={ci} className="c" style={{ ["--ci" as string]: ci++ }}>
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
        ),
      )}
    </span>,
  );
}
