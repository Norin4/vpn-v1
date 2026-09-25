import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { site } from "../content/site";
import { legalUpdated } from "../content/legal";
import Split from "./Split";
import Reveal from "./Reveal";
import Btn from "./Btn";

type Doc = {
  title: string;
  current: string;
  updated?: string;
  body: string | null;
  glance?: [string, string][];
  other: { to: string; label: string };
};

type Section = { id: string; title: string; blocks: string[] };

// turn plain email addresses into mailto links, text otherwise untouched
const linkify = (text: string) =>
  text.split(/(\S+@\S+\.[a-z]{2,})/i).map((part, i) =>
    /@/.test(part) ? <a key={i} href={`mailto:${part}`}>{part}</a> : part,
  );

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Split the verbatim text into an intro and "## " sections; wording is never changed. */
function parse(body: string) {
  const intro: string[] = [];
  const sections: Section[] = [];
  for (const block of body.split(/\n{2,}/)) {
    if (block.startsWith("## ")) {
      const title = block.slice(3);
      sections.push({ id: slug(title), title, blocks: [] });
    } else if (sections.length) sections[sections.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return { intro, sections };
}

function Block({ text }: { text: string }): ReactNode {
  if (text.startsWith("### ")) return <h3>{text.slice(4)}</h3>;
  if (text.startsWith("- "))
    return (
      <ul>
        {text.split("\n").map((li, j) => <li key={j}>{linkify(li.replace(/^- /, ""))}</li>)}
      </ul>
    );
  // all-caps legal clauses get a quiet box so they don't shout across the page
  const caps = text.length > 40 && text === text.toUpperCase();
  return (
    <p className={caps ? "legal-caps" : undefined}>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linkify(line)}
        </Fragment>
      ))}
    </p>
  );
}

export default function LegalPage({ doc }: { doc: Doc }) {
  const { intro, sections } = useMemo(() => parse(doc.body ?? ""), [doc.body]);
  const [active, setActive] = useState(sections[0]?.id);

  // highlight the section whose heading last passed the upper third of the viewport
  useEffect(() => {
    const onScroll = () => {
      let cur = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [sections]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 110, behavior: "smooth" });
  };

  return (
    <>
      <section className="lhero" data-dark>
        <div className="container">
          <Reveal as="span" className="eyebrow lhero__date">
            {doc.updated ?? `Effective ${legalUpdated}`}
          </Reveal>
          <Split as="h1" className="lhero__title" parts={[[doc.title]]} />
          <Reveal className="lhero__meta" delay={400}>
            <span>{sections.length} sections</span>
            <a href={`mailto:${site.email}`} className="lhero__chip">{site.email}</a>
            <Link to={doc.other.to} className="lhero__chip">{doc.other.label} →</Link>
          </Reveal>
        </div>
      </section>

      <section className="legal2 panel">
        <div className="container legal2__grid">
          <aside className="legal2__toc" aria-label="Contents">
            <span className="eyebrow">Contents</span>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    className={active === s.id ? "is-on" : ""}
                    onClick={() => go(s.id)}
                    aria-current={active === s.id ? "true" : undefined}
                    aria-label={s.title}
                    title={s.title}
                  >
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <i aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <article className="legal2__body">
            {doc.glance && (
              <Reveal className="glance">
                <span className="eyebrow">At a glance</span>
                <div className="glance__grid">
                  {doc.glance.map(([h, t]) => (
                    <div className="glance__card" key={h}>
                      <b>{h}</b>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <p className="glance__note">A short summary for convenience — the full text below is what applies.</p>
              </Reveal>
            )}

            {intro.map((t, i) => (
              <p className="legal2__intro" key={i}>{linkify(t)}</p>
            ))}

            {sections.map((s, i) => (
              <section className="lsec" id={s.id} key={s.id}>
                <div className="lsec__head">
                  <span className="lsec__n">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{s.title}</h2>
                </div>
                <div className="lsec__text">
                  {s.blocks.map((b, j) => <Block key={j} text={b} />)}
                </div>
              </section>
            ))}

            <div className="legal2__ask">
              <div>
                <span className="eyebrow">Questions about this document?</span>
                <p>
                  Write to <a href={`mailto:${site.email}`}>{site.email}</a> and we'll get back to you.
                </p>
              </div>
              <Btn to="/contact">Contact us</Btn>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
