import { app, features, site, tools } from "../content/site";
import { img } from "../utils/img";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Btn from "../components/Btn";
import FeatureStack from "../components/FeatureStack";

export default function OurApp() {
  return (
    <>
      <section className="ptop">
        <div className="container">
          <Reveal as="span" className="eyebrow">The app</Reveal>
          <Split className="ptop__title" parts={[["One button."], ["Total", true], ["privacy."]]} />
          <Reveal as="p" className="ptop__lead" delay={400}>
            {app.name} — a VPN for iPhone that connects in one tap, picks the fastest server for you and
            keeps your traffic private on any network.
          </Reveal>
          <Reveal delay={500} style={{ marginTop: "40rem" }}>
            <Btn href={app.url}>Download on the App Store</Btn>
          </Reveal>
        </div>
      </section>

      <section aria-label="App Store screenshots" style={{ paddingBottom: "60rem" }}>
        <Reveal className="strip">
          {[1, 2, 3, 4, 5].map((n) => (
            <img key={n} src={img(`/images/strip${n}.jpg`)} alt={`${site.brand} App Store screenshot ${n}`} loading="lazy" width={660} height={1434} />
          ))}
        </Reveal>
      </section>

      <FeatureStack
        slides={[
          ...features.map((f, i) => ({
            key: f.tag,
            photo: !!f.photo,
            media: f.photo ? (
              <img src={img(f.photo)} alt={`${f.tag} in the ${site.brand} app`} loading="lazy" width={2000} height={1333} />
            ) : (
              <img src={img(f.phone ?? f.screen!)} alt={`${f.tag} screen on iPhone`} loading="lazy" width={548} height={1120} />
            ),
            body: (
              <>
                <span className="frow__n">0{i + 1}</span>
                <span className="eyebrow" style={{ display: "block", marginTop: "12rem" }}>{f.tag}</span>
                <h2>{f.title}</h2>
                <p>{f.text}</p>
              </>
            ),
          })),
          {
            key: "tools",
            media: <img src={img("/images/mock-features.png")} alt="VPN Features sheet" loading="lazy" width={533} height={871} />,
            body: (
              <>
                <span className="frow__n">0{features.length + 1}</span>
                <span className="eyebrow" style={{ display: "block", marginTop: "12rem" }}>VPN Features</span>
                <h2>Tuned for any network</h2>
                <ul className="tile__list tile__list--light">
                  {tools.map(([t, d]) => (
                    <li key={t}><b>{t}</b><span>{d}</span></li>
                  ))}
                </ul>
              </>
            ),
          },
        ]}
      />

      <section className="dark panel panel--dark panel--round" data-dark style={{ marginTop: "60rem" }}>
        <div className="container split2">
          <Reveal as="h2" className="title">
            App <span className="i">details</span>
          </Reveal>
          <Reveal>
            <table className="specs">
              <tbody>
                {[
                  ["Name", app.name],
                  ["Compatibility", `iPhone · iOS ${app.minIOS} or later`],
                  ["Size", app.size],
                  ["Category", app.category],
                  ["Languages", `${app.languages}, including English, Russian, Spanish, French, German, Arabic, Hindi and Turkish`],
                  ["Age rating", app.age],
                  ["Price", app.price],
                  ["Released", app.released],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "40rem" }}>
              <Btn href={app.url} variant="white">View on the App Store</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
