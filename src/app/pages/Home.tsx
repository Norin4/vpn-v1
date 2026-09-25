import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Globe2, MapPin, ShieldCheck, Star, Moon, Wifi, Zap, Languages, Ban, Rocket, EyeOff } from "lucide-react";
import { app, features, site, tools } from "../content/site";
import { serverList } from "../content/servers";
import { img } from "../utils/img";
import { useReveal } from "../utils/useReveal";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Btn from "../components/Btn";
import Marquee from "../components/Marquee";
import ServerMap from "../components/ServerMap";

export default function Home() {
  return (
    <>
      <Hero />
      <Reel />
      <Ticker />
      <Features />
      <More />
      <Servers />
      <Dark />
      <Steps />
      <Scheme />
    </>
  );
}

/* ── hero ─────────────────────────────────────────────────── */
function Hero() {
  const { ref, shown } = useReveal<HTMLElement>("0px");
  return (
    <section ref={ref} className={`hero ${shown ? "is-in" : ""}`} data-dark>
      <div className="hero__media">
        <img src={img("/images/hero.jpg")} alt="" width={2560} height={1440} />
      </div>
      <div className="container">
        <Reveal as="span" className="hero__eyebrow" delay={200}>
          <span className="dot-live" aria-hidden="true" /> VPN &amp; secure proxy for iPhone
        </Reveal>
        <Split
          className="hero__title"
          parts={[["Secure VPN,"], ["\n"], ["one tap", true], ["away"]]}
        />
        <Reveal line className="hero__bottom">
          <Reveal as="p" className="hero__info" delay={500} style={{ margin: 0 }}>
            An encrypted VPN tunnel for every connection: hide your IP, lock down public Wi‑Fi and switch
            between fast servers worldwide — with zero logs.
          </Reveal>
          <Reveal delay={600} style={{ display: "flex", gap: "20rem", alignItems: "center", flexWrap: "wrap" }}>
            <span className="hero__meta">
              Free VPN on the App Store · iOS {app.minIOS}+
            </span>
            <Btn href={app.url} variant="white">Download</Btn>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}

/* ── reel: marquee with live connection timer + sticky scaling stage ── */
function useTimer(start = 17 * 60 + 17) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
}

function Reel() {
  const time = useTimer();
  const track = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // scale .8 → 1 across the first 60% of the track, phones drift sideways the whole way
  const s = 0.8 + 0.2 * Math.min(1, p / 0.6);
  const stage = { ["--s" as string]: s, ["--z" as string]: 1.18 - 0.18 * Math.min(1, p / 0.8) } as CSSProperties;

  return (
    <section className="reel panel" aria-label="App preview">
      <Marquee time={50}>
        {Array.from({ length: 3 }, (_, i) => (
          <span className="reel__item" key={i}>
            Connected
            <small>
              <span className="dot-live" aria-hidden="true" />
              {time}
            </small>
            Private
            <small>{app.languages} languages</small>
            Fast
            <small>iOS {app.minIOS}+</small>
          </span>
        ))}
      </Marquee>

      <div className="reel__track" ref={track}>
        <div className="reel__sticky">
          <div className="reel__stage" style={stage} data-dark>
            <img
              className="reel__photo"
              src={img("/images/mock-hands.jpg")}
              alt={`${site.brand} connecting screen on an iPhone held in two hands`}
              loading="lazy"
              width={2000}
              height={1667}
            />
            <div className="reel__caption">
              <span>{app.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ticker ───────────────────────────────────────────────── */
const tickerItems = [
  { icon: Zap, label: "One‑tap connection" },
  { icon: Globe2, label: "Servers worldwide" },
  { icon: Wifi, label: "Safe public Wi‑Fi" },
  { icon: ShieldCheck, label: "Encrypted traffic" },
  { icon: MapPin, label: "Best location" },
  { icon: Star, label: "Favorites" },
  { icon: Moon, label: "Dark mode" },
  { icon: Ban, label: "Ad blocker" },
  { icon: Rocket, label: "Boost speed" },
  { icon: EyeOff, label: "Zero logs" },
  { icon: Languages, label: "30 languages" },
];

const countries = serverList.map((s) => s.country).filter((c, i, a) => a.indexOf(c) === i);

/* ── more than a VPN: AdBlocker + VPN Features tiles ─────── */
function More() {
  return (
    <section className="more">
      <div className="container">
        <div className="more__head">
          <Reveal as="h2" className="title">
            More than <span className="i">a VPN</span>
          </Reveal>
          <Reveal as="p" className="servers__lead muted" delay={100}>
            A second tab blocks ads, and the VPN Features sheet keeps the connection fast — even on a weak network.
          </Reveal>
        </div>
        <div className="more__grid">
          <Reveal as="article" className="tile tile--photo">
            <div className="tile__media">
              <img src={img("/images/mock-adblock.jpg")} alt={`AdBlocker tab of ${site.brand} on an iPhone`} loading="lazy" width={2000} height={1333} />
              <span className="chip"><b>01</b>Ad Blocker</span>
            </div>
            <h3 className="card__name">Banners, pop‑ups and video ads — off</h3>
            <p className="card__text">
              One switch turns on instant blocking. The counter shows how many banners, video ads and pop‑ups you've
              already run into today.
            </p>
          </Reveal>
          <Reveal as="article" className="tile tile--blue" delay={120}>
            <div className="tile__media">
              <img className="tile__phone" src={img("/images/mock-features.png")} alt="VPN Features sheet with Boost Speed and Optimize For Slow Network" loading="lazy" width={533} height={871} />
              <span className="chip"><b>02</b>VPN Features</span>
            </div>
            <h3 className="card__name">Tuned for any network</h3>
            <ul className="tile__list">
              {tools.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── servers: interactive 3D map + list styled like the app ── */
function Servers() {
  return (
    <section className="servers panel panel--dark panel--round" data-dark aria-labelledby="servers-title">
      <div className="container">
        <div className="servers__head">
          <Reveal as="h2" className="title" id="servers-title">
            Pick a <span className="i">server,</span> <br />
            any server
          </Reveal>
          <Reveal as="p" className="servers__lead" delay={100}>
            Stay on Best Location for the fastest route, or pick any of {serverList.length} locations on the map or in the list. Star the ones you
            use most — they wait in Favorites.
          </Reveal>
        </div>
        <Reveal className="servers__grid">
          <ServerMap />
        </Reveal>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <section className="ticker" aria-label="Highlights">
      <Marquee time={55}>
        {tickerItems.map(({ icon: Icon, label }) => (
          <span className="ticker__item" key={label}>
            <Icon strokeWidth={1.6} />
            {label}
          </span>
        ))}
      </Marquee>
      <Marquee time={45} reverse className="ticker__row2">
        {countries.map((c) => (
          <span className="ticker__item ticker__item--country" key={c}>
            <MapPin strokeWidth={1.6} />
            {c}
          </span>
        ))}
      </Marquee>
      <ul className="sr-only">
        {tickerItems.map((t) => <li key={t.label}>{t.label}</li>)}
      </ul>
    </section>
  );
}

/* ── features grid ────────────────────────────────────────── */
function Features() {
  return (
    <section className="feat" id="features">
      <div className="container">
        <Reveal as="h2" className="title">
          Everything you need to stay <span className="i">private</span> online — and nothing you don't
        </Reveal>
        <div className="feat__list">
          {features.map((f, i) => (
            <Reveal as="article" className="card" key={f.tag} delay={(i % 3) * 80}>
              <div className="card__img">
                <img src={img(f.card)} alt={`${f.tag} screen of the ${site.brand} app`} loading="lazy" width={900} height={900} />
                <span className="chip"><b>0{i + 1}</b>{f.tag}</span>
              </div>
              <h3 className="card__name">{f.title}</h3>
              <p className="card__text">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── dark section: promise, numbers, principles ───────────── */
function Dark() {
  return (
    <section className="dark panel panel--dark panel--round" data-dark>
      <Marquee time={65} className="dark__marquee" label="Privacy by default">
        {Array.from({ length: 4 }, (_, i) => <span key={i}>Privacy by default</span>)}
      </Marquee>
      <div className="container">
        <div className="dark__grid">
          <Reveal>
            <div className="quote__who">
              <img src={img("/images/app-icon.png")} alt="" width={56} height={56} />
              <div>
                {site.brand} team
                <span>Why we built it</span>
              </div>
            </div>
            <p className="quote__text">
              “Protection shouldn't need a manual. Open the app, tap <span className="i">once</span> — and your
              connection is private, wherever you are.”
            </p>
          </Reveal>
          <div className="stats">
            {[
              ["1", "tap to connect"],
              [String(app.languages), "languages in the app"],
              ["0", "browsing logs kept"],
            ].map(([n, t], i) => (
              <Reveal className="stat" key={t} delay={i * 100}>
                <b>{n}</b>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="principles">
            <span className="eyebrow">What you get</span>
            <ul>
              <li>Your IP address stays hidden</li>
              <li>Internet traffic is encrypted</li>
              <li>Hotspots and shared networks are safe to use</li>
              <li>Auto‑connect when the app starts</li>
              <li>Ads, pop‑ups and video ads blocked</li>
              <li>Boost Speed and Optimize for Slow Network</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── steps slider ─────────────────────────────────────────── */
const steps = [
  {
    title: "Download the app",
    text: `Get ${site.brand} free from the App Store. It runs on iPhone with iOS ${app.minIOS} or later.`,
    image: "/images/app-icon-lg.png",
    icon: true,
  },
  {
    title: "Tap the power button",
    text: "Allow the VPN configuration once, then a single tap connects you to the fastest available server.",
    image: "/images/card1.jpg",
  },
  {
    title: "Pick a location",
    text: "Stay on Best Location or open the server list and choose a country. Star the ones you use most.",
    image: "/images/card2.jpg",
  },
];

/** Pinned while you scroll through it; each third of the track shows the next step. */
function Steps() {
  const track = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const n = steps.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = r.height - innerHeight;
      const prog = Math.min(1, Math.max(0, -r.top / (range || 1)));
      setP(prog);
      setI(Math.min(n - 1, Math.floor(prog * n)));
    };
    // direct update when the tab is hidden (rAF is paused there), rAF otherwise
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

  // arrows scroll the page to the middle of that step's slice of the track
  const go = (k: number) => {
    const el = track.current;
    if (!el) return;
    const range = el.offsetHeight - innerHeight;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY + ((k + 0.5) / n) * range, behavior: "smooth" });
  };

  const s = steps[i];
  return (
    <section className="steps" ref={track} style={{ height: `${100 + n * 70}vh` }} aria-roledescription="carousel" aria-label="How it works">
      <div className="steps__sticky">
        <div className="container">
          <div className="steps__wrap">
            <div>
              <Reveal as="h2" className="title">
                Three steps <br />to a <span className="i">private</span> <br />connection
              </Reveal>
              <div className="nav-arrows">
                <button className="nav-arrow" aria-label="Previous step" disabled={i === 0} onClick={() => go(i - 1)}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
                <button className="nav-arrow" aria-label="Next step" disabled={i === n - 1} onClick={() => go(i + 1)}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>
            <div>
              <div className="steps__bar" aria-hidden="true">
                {steps.map((_, k) => (
                  <span key={k}>
                    <i style={{ transform: `scaleX(${Math.min(1, Math.max(0, p * n - k))})` }} />
                  </span>
                ))}
              </div>
              <div className="steps__slide fade-swap" key={i} aria-live="polite">
                <div style={{ display: "flex", flexDirection: "column", gap: "20rem" }}>
                  <span className="steps__num">
                    0{i + 1} / 0{n}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <div className={`steps__img${s.icon ? " steps__img--icon" : ""}`}>
                  <img src={img(s.image)} alt={s.icon ? `${site.brand} app icon` : ""} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── scheme: giant words + use cases ──────────────────────── */
function Scheme() {
  const cases = [
    ["01", "Public Wi‑Fi", "Cafés, airports and hotels share one network with strangers. Connect before you check mail or pay.", "/images/use-cafe.jpg"],
    ["02", "Travel", "Switch between servers around the world and keep one familiar, private connection on the road.", "/images/use-travel.jpg"],
    ["03", "Every day", "Turn on auto‑connect and forget about it — the app protects you each time it starts.", "/images/use-home.jpg"],
  ];
  return (
    <section className="scheme">
      <div className="container">
        <h2 className="scheme__title" aria-label="Connect. Protect. Browse.">
          <Reveal as="span">Connect</Reveal>
          <Reveal as="span" className="ghost" delay={100}>Protect</Reveal>
          <Reveal as="span" delay={200}>Browse</Reveal>
        </h2>
        <div className="scheme__cols">
          {cases.map(([n, h, t, photo], i) => (
            <Reveal line className="scheme__col" key={n} delay={i * 100}>
              <div className="scheme__img">
                <img src={img(photo)} alt={`${h}: using ${site.brand} on iPhone`} loading="lazy" width={1400} height={933} />
              </div>
              <span className="eyebrow">{n} · Use case</span>
              <h3>{h}</h3>
              <p>{t}</p>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop: "60rem" }}>
          <Btn href={app.url}>Download {site.brand}</Btn>
        </Reveal>
      </div>
    </section>
  );
}
