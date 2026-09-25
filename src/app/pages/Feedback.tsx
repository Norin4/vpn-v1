import { app, site } from "../content/site";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import MailForm from "../components/MailForm";
import Btn from "../components/Btn";

export default function Feedback() {
  return (
    <>
      <section className="ptop">
        <div className="container">
          <Reveal as="span" className="eyebrow">Feedback</Reveal>
          <Split className="ptop__title" parts={[["Tell us"], ["anything", true]]} />
          <Reveal as="p" className="ptop__lead" delay={400}>
            Found a bug or missing a feature? Every message is read by the people who build {site.brand}.
          </Reveal>
        </div>
      </section>
      <section style={{ paddingBottom: "140rem" }}>
        <div className="container split2">
          <Reveal>
            <span className="eyebrow">Enjoying the app?</span>
            <p className="muted" style={{ maxWidth: "34ch", margin: "16rem 0 24rem" }}>
              A rating on the App Store helps other people find a simple, private VPN.
            </p>
            <Btn href={`${app.url}?action=write-review`} variant="white">Rate on the App Store</Btn>
          </Reveal>
          <Reveal delay={100}>
            <MailForm
              subject={`${site.brand} — feedback`}
              submit="Send feedback"
              fields={[
                { name: "kind", label: "Type", options: ["Bug report", "Feature request", "General feedback"], required: true },
                { name: "email", label: "Email (for a reply)", type: "email", auto: "email" },
                { name: "device", label: "iPhone model & iOS version" },
                { name: "message", label: "Your feedback", textarea: true, required: true },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
