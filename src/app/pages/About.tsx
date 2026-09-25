import { app, site } from "../content/site";
import { img } from "../utils/img";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Btn from "../components/Btn";
import Marquee from "../components/Marquee";

export default function About() {
  return (
    <>
      <section className="ptop ptop--dark" data-dark style={{ position: "relative", overflow: "hidden" }}>
        <img src={img("/images/shield.jpg")} alt="" className="about__art" />
        <img
          src={img("/images/hand-connected.webp")}
          alt={`${site.brand} connected to Toronto on an iPhone`}
          className="about__hand"
          width={1279}
          height={1232}
        />
        <div className="container" style={{ position: "relative" }}>
          <Reveal as="span" className="eyebrow">About</Reveal>
          <Split className="ptop__title" parts={[["Privacy,"], ["made", true], ["simple"]]} />
          <Reveal as="p" className="ptop__lead" delay={400}>
            {site.brand} started with a simple frustration: staying private online felt like a technical chore.
            We set out to turn it into one tap.
          </Reveal>
        </div>
      </section>

      <section className="panel" style={{ padding: "100rem 0" }}>
        <div className="container split2">
          <Reveal as="span" className="eyebrow">Our approach</Reveal>
          <div style={{ display: "grid", gap: "40rem" }}>
            <Reveal as="p" className="quote__text" style={{ margin: 0, maxWidth: "30ch" }}>
              We design for people who just want to get online <span className="i">safely</span> — on a café
              hotspot, in an airport, or at home.
            </Reveal>
            <Reveal as="p" className="muted" style={{ margin: 0, maxWidth: "56ch" }}>
              That is why the main screen of {site.brand} is one large power button, a live connection timer and
              your download and upload stats. Everything else — the server list, favorites, auto‑connect and
              connect on demand — sits one step away, not in the way. The app is translated into {app.languages}{" "}
              languages and keeps getting regular updates.
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee time={60} className="dark__marquee" label="Simple, fast, private">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>Simple — Fast — Private — </span>
        ))}
      </Marquee>

      <section style={{ padding: "100rem 0 140rem" }}>
        <div className="container">
          <div className="scheme__cols" style={{ marginTop: 0 }}>
            {[
              ["Simple", "One screen, one button. No settings you have to understand before you're protected."],
              ["Fast", "Optimised servers and automatic best‑location choice for stable, quick connections."],
              ["Private", "Your IP address is hidden and your traffic encrypted every time you connect."],
            ].map(([h, t], i) => (
              <Reveal line className="scheme__col" key={h} delay={i * 100}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{h}</h3>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: "60rem", display: "flex", gap: "16rem", flexWrap: "wrap" }}>
            <Btn href={app.url}>Download {site.brand}</Btn>
            <Btn to="/contact" variant="white" className="btn--outline">Get in touch</Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
