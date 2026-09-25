import { Link } from "react-router";
import { app, site } from "../content/site";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Btn from "../components/Btn";

const faq = [
  ["How do I connect?", "Open the app and tap the large power button on the main screen. The first time, iOS asks you to allow the VPN configuration — tap Allow. When the status reads Connected, you're protected."],
  ["How do I choose a server?", "Tap the location card on the main screen to open the Server List. Keep Best Location for the fastest server, or pick any country. Tap the star to add a server to Favorites."],
  ["Can the VPN connect automatically?", "Yes. Open VPN Features and turn on Auto Connection to connect when the app starts, or Connect On Demand to connect on untrusted networks."],
  ["How do I block ads?", "Switch to the AdBlocker tab at the bottom of the app and turn the switch on. Banners, pop‑ups and video ads are blocked instantly."],
  ["What do Boost Speed and Optimize For Slow Network do?", "Both live in VPN Features. Boost Speed aims for the fastest connection; Optimize For Slow Network keeps the tunnel stable on weak Wi‑Fi or mobile data."],
  ["How do I remove the VPN profile?", "Open VPN Features and tap Remove Configuration. You can also delete it in iOS Settings → General → VPN & Device Management."],
  ["How do I manage or cancel my subscription?", "Subscriptions are billed through your Apple ID. Open iOS Settings → your name → Subscriptions, choose Fast VPN and turn off auto‑renewal at least 24 hours before the current period ends."],
  ["How do I restore a purchase on a new iPhone?", "Sign in with the same Apple ID, open the app and use Restore Purchases on the subscription screen."],
  ["The connection is slow or drops. What can I do?", "Switch to another server or Best Location, toggle Wi‑Fi or mobile data, and make sure you're on the latest version of the app. If it continues, write to us with your iOS version and the server you used."],
];

export default function Support() {
  return (
    <>
      <section className="ptop">
        <div className="container">
          <Reveal as="span" className="eyebrow">Support</Reveal>
          <Split className="ptop__title" parts={[["How can we"], ["help?", true]]} />
          <Reveal as="p" className="ptop__lead" delay={400}>
            Answers to common questions about {site.brand}. Can't find yours? Email us and we'll get back to you.
          </Reveal>
        </div>
      </section>
      <section style={{ paddingBottom: "140rem" }}>
        <div className="container split2">
          <Reveal>
            <span className="eyebrow">Still stuck?</span>
            <p style={{ margin: "16rem 0 24rem" }}>
              <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent("Fast VPN support")}`}>{site.email}</a>
            </p>
            <div style={{ display: "flex", gap: "12rem", flexWrap: "wrap" }}>
              <Btn to="/contact">Contact us</Btn>
              <Btn href={app.url} variant="white">App Store</Btn>
            </div>
          </Reveal>
          <Reveal className="faq">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M5 9 12 16 19 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </i>
                </summary>
                <p>{a}</p>
              </details>
            ))}
            <p className="note" style={{ marginTop: "24rem" }}>
              See also our <Link className="link" to="/privacy">Privacy Policy</Link> and{" "}
              <Link className="link" to="/terms">Terms of Use</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
