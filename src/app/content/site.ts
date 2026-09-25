// Every brand / app fact lives here so names, IDs and emails are never duplicated.
// App facts come from the App Store lookup API (id 6745890037), not invented.

export const site = {
  brand: "Fast VPN",
  email: "andriana@woolheaven.store",
  year: new Date().getFullYear(),
};

export const app = {
  name: "Super Fast VPN・Unlimited Proxy",
  id: "6745890037",
  url: "https://apps.apple.com/app/id6745890037",
  version: "2.5",
  minIOS: "17.0",
  size: "125 MB",
  languages: 30,
  category: "Utilities",
  age: "4+",
  price: "Free · In‑App Purchases",
  released: "May 2025",
};

export const features = [
  {
    tag: "Private Browser",
    title: "Browse safely, zero logs",
    text: "Hide your IP address and encrypt your traffic with a single tap on the power button.",
    card: "/images/card1.jpg",
    screen: "/images/screen1.jpg",
    phone: "/images/phone-browser.png",
  },
  {
    tag: "All Locations",
    title: "Fast servers worldwide",
    text: "Pick the best location automatically or choose a country from the server list yourself.",
    card: "/images/card2.jpg",
    screen: "/images/screen2.jpg",
    phone: "/images/phone-locations.png",
  },
  {
    tag: "VPN Security",
    title: "Autoconnect on startup",
    text: "Turn on Auto Connection and Connect On Demand so you're protected before you open a browser.",
    card: "/images/card3.jpg",
    screen: "/images/screen3.jpg",
    phone: "/images/phone-security.png",
  },
  {
    tag: "Favorites",
    title: "Add top servers",
    text: "Star the locations you use most and switch between them from the Favorites tab.",
    card: "/images/card4.jpg",
    screen: "/images/screen4.jpg",
    phone: "/images/phone-favorites.png",
  },
  {
    tag: "Dark Mode",
    title: "Eye‑friendly interface",
    text: "A calm interface in light and dark, with live download and upload stats on the main screen.",
    card: "/images/card5.jpg",
    screen: "/images/screen5.jpg",
    phone: "/images/phone-darkmode.png",
  },
  {
    tag: "Ad Blocker",
    title: "Block ads and pop‑ups",
    text: "Switch to the AdBlocker tab to stop banners, pop‑ups and video ads — and see how many you've met today.",
    card: "/images/card-adblock.jpg",
    photo: "/images/mock-adblock.jpg",
  },
] as { tag: string; title: string; text: string; card: string; screen?: string; phone?: string; photo?: string }[];

// Toggles in the app's "VPN Features" sheet
export const tools = [
  ["Auto Connection", "Connects on startup"],
  ["Connect On Demand", "Trusted network connect"],
  ["Enable Boost Speed", "Squeeze more out of every server"],
  ["Optimize For Slow Network", "Stable on weak Wi‑Fi and mobile data"],
];

export const nav = [
  { to: "/app", label: "App" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
];
