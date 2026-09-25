// Server locations shown on the interactive map.
// The first five match the app's Server List screenshots; keep this list in sync
// with the servers actually offered in the app.

export type Server = {
  code: string;
  country: string;
  city: string;
  lon: number;
  lat: number;
  tz: string;
};

export const serverList: Server[] = [
  { code: "CA", country: "Canada", city: "Toronto", lon: -79.4, lat: 43.7, tz: "America/Toronto" },
  { code: "PL", country: "Poland", city: "Warsaw", lon: 21, lat: 52.2, tz: "Europe/Warsaw" },
  { code: "DE", country: "Germany", city: "Berlin", lon: 13.4, lat: 52.5, tz: "Europe/Berlin" },
  { code: "FR", country: "France", city: "Paris", lon: 2.35, lat: 48.85, tz: "Europe/Paris" },
  { code: "NL", country: "Netherlands", city: "Amsterdam", lon: 4.9, lat: 52.37, tz: "Europe/Amsterdam" },
  { code: "US", country: "United States", city: "New York", lon: -74, lat: 40.7, tz: "America/New_York" },
  { code: "SG", country: "Singapore", city: "Singapore", lon: 103.82, lat: 1.35, tz: "Asia/Singapore" },
  { code: "JP", country: "Japan", city: "Tokyo", lon: 139.69, lat: 35.69, tz: "Asia/Tokyo" },
];

// same equirectangular projection as worldmap.ts (1000 × 440, lat 78…-58)
export const project = (lon: number, lat: number): [number, number] => [
  ((lon + 180) / 360) * 1000,
  ((78 - lat) / 136) * 440,
];
