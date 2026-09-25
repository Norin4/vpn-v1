import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const titles: Record<string, string> = {
  "/app": "The App",
  "/about": "About",
  "/support": "Support",
  "/contact": "Contact",
  "/feedback": "Feedback",
  "/terms": "Terms of Use",
  "/privacy": "Privacy Policy",
};

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const t = titles[pathname.replace(/\/$/, "")];
    document.title = t ? `${t} — Fast VPN` : "Fast VPN — secure VPN for iPhone";
  }, [pathname]);

  if (pathname.replace(/\/$/, "").endsWith("/app-store")) return <Outlet />;

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
