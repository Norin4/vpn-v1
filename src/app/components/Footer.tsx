import { Link } from "react-router";
import { app, nav, site } from "../content/site";
import { img } from "../utils/img";
import Marquee from "./Marquee";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer panel" data-dark>
      <img className="footer__ring" src={img("/images/shield.jpg")} alt="" loading="lazy" />
      <div className="container">
        <div className="footer__top">
          <Reveal>
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="footer__order">
              <span>
                Get <span className="i">protected</span>
              </span>
            </a>
          </Reveal>
          <div className="footer__cols">
            <div>
              <span className="eyebrow">Pages</span>
              <ul>
                <li><Link to="/" className="link">Home</Link></li>
                {nav.map((n) => (
                  <li key={n.to}><Link to={n.to} className="link">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Help</span>
              <ul>
                <li><Link to="/feedback" className="link">Feedback</Link></li>
                <li><Link to="/privacy" className="link">Privacy Policy</Link></li>
                <li><Link to="/terms" className="link">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <span className="eyebrow">Contact</span>
              <ul>
                <li><a href={`mailto:${site.email}`} className="link">{site.email}</a></li>
                <li>
                  <a href={app.url} target="_blank" rel="noopener noreferrer" className="link">
                    App Store
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Marquee time={60} className="footer__marquee" label={site.brand}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>{site.brand}</span>
        ))}
      </Marquee>

      <div className="container">
        <div className="footer__copy">
          <span>© {site.year} {site.brand}. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link to="/privacy" className="link">Privacy</Link>
            <Link to="/terms" className="link">Terms</Link>
            <button className="link" onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
              Back to top ↑
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
