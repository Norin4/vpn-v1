import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { nav, app, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "./Btn";

/**
 * Reference header: hides while scrolling down, returns on scroll up,
 * and switches to light-on-dark over any section marked data-dark.
 */
export default function Header() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let last = scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      setSolid(y > 40);
      setHidden(y > 300 && y > last);
      last = y;
      const probe = 30;
      const hit = [...document.querySelectorAll<HTMLElement>("[data-dark]")].some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setDark(hit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    // content height changes after route render
    const t = setTimeout(update, 50);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  const cls = ["header", dark || open ? "is-dark" : "", solid && !open ? "is-solid" : "", hidden && !open ? "is-hidden" : ""].join(" ");

  return (
    <>
      <header className={cls}>
        <div className="container">
          <Link to="/" className="logo" aria-label={`${site.brand} home`}>
            <img src={img("/images/app-icon.png")} alt="" width={44} height={44} />
            {site.brand}
          </Link>
          <nav className="header__nav" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `link${isActive ? " is-active" : ""}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Btn href={app.url} variant={dark ? "white" : "dark"} className="header__cta">
            Download
          </Btn>
          <button
            className={`burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mmenu"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="mmenu" className={`mmenu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <Link to="/" className="mmenu__link" tabIndex={open ? 0 : -1}>Home</Link>
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="mmenu__link" tabIndex={open ? 0 : -1}>
            {n.label}
          </Link>
        ))}
        <Btn href={app.url} variant="white">Download on the App Store</Btn>
      </div>
    </>
  );
}
