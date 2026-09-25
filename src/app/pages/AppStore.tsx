import { useEffect } from "react";
import { app, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "../components/Btn";

export default function AppStore() {
  useEffect(() => {
    const t = setTimeout(() => location.replace(app.url), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="redirect">
      <div>
        <img className="icon" src={img("/images/app-icon.png")} alt={`${site.brand} icon`} width={96} height={96} />
        <p style={{ fontSize: 28, letterSpacing: "-0.04em", margin: "0 0 8px" }}>Opening the App Store…</p>
        <p style={{ color: "#969393", margin: "0 0 28px" }}>{app.name}</p>
        <Btn href={app.url} variant="white">Open now</Btn>
      </div>
    </section>
  );
}
