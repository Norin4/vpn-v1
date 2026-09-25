import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import OurApp from "./pages/OurApp";
import AppStore from "./pages/AppStore";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "app", Component: OurApp },
        { path: "app-store", Component: AppStore },
        { path: "about", Component: About },
        { path: "support", Component: Support },
        { path: "contact", Component: Contact },
        { path: "feedback", Component: Feedback },
        { path: "terms", Component: Terms },
        { path: "privacy", Component: Privacy },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
