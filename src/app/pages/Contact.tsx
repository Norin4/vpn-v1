import { site } from "../content/site";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import MailForm from "../components/MailForm";

export default function Contact() {
  return (
    <>
      <section className="ptop">
        <div className="container">
          <Reveal as="span" className="eyebrow">Contact</Reveal>
          <Split className="ptop__title" parts={[["Let's"], ["talk", true]]} />
        </div>
      </section>
      <section style={{ paddingBottom: "140rem" }}>
        <div className="container split2">
          <Reveal>
            <span className="eyebrow">Email</span>
            <p style={{ margin: "16rem 0 0" }}>
              <a className="contact-big link" href={`mailto:${site.email}`}>
                {site.email.split("@")[0]}@<wbr />
                {site.email.split("@")[1]}
              </a>
            </p>
            <p className="muted" style={{ maxWidth: "36ch", marginTop: "24rem" }}>
              Questions, partnership or press — we usually reply within two business days.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <MailForm
              subject={`${site.brand} — website enquiry`}
              submit="Send message"
              fields={[
                { name: "name", label: "Name", required: true, auto: "name" },
                { name: "email", label: "Email", type: "email", required: true, auto: "email" },
                { name: "topic", label: "Topic", options: ["Question about the app", "Subscription & billing", "Partnership", "Press", "Other"] },
                { name: "message", label: "Message", textarea: true, required: true },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
