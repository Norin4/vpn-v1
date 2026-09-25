# Fast VPN — promo site

Promo site for **Super Fast VPN・Unlimited Proxy** (App Store id `6745890037`).
React 18 + TypeScript + Vite 6 + Tailwind 4 (preflight only) + React Router 7.
Design language follows slavnydesign.com: viewport‑scaled rem grid, Manrope 500 with
Cormorant Garamond italic accents, rounded overlapping panels, marquees, char‑by‑char headlines.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # → dist/
```

## Where things live
- `src/app/content/site.ts` — every brand/app fact (name, email, App Store id, specs, features)
- `src/app/content/legal.ts` — Privacy / Terms. Paste the owner's text into `body` **verbatim**
- `src/styles/index.css` — the whole design system (tokens, grid, sections)
- `public/images/` — hero/ring renders (Magnific), App Store screenshots and crops, icons

## Rules
- **rem scales with the viewport** (`--fz` on `:root`). Tailwind spacing utilities scale too,
  so layout is written in `index.css`, not in utility classes.
- **Images:** always `img("/images/…")` from `utils/img.ts` — Vite does not rewrite string paths.
- **Reveals:** use `<Reveal>` / `<Split>` (built on `utils/useReveal.ts`). Never start content at
  `opacity: 0` via a JS animation; fallbacks are gated on real geometry.

## Deploy (GitHub Pages)
`.github/workflows/deploy.yml` builds on push to `main` and copies `index.html` → `404.html`
for client‑side routing. In the repo: Settings → Pages → Source: **GitHub Actions**.

Live at **https://fastvpn.buzz** — `base: '/'` with `public/CNAME` = `fastvpn.buzz`.
If the domain is ever removed, `base` must go back to `'/vpn-v1/'` (site then lives at
norin4.github.io/vpn-v1/), or every asset 404s and the page is blank. Deep links return HTTP 404 on Pages (fine for people, not for crawlers).

## Photo credits
Use-case photos (`use-*.jpg`) are from Unsplash under the Unsplash License (free commercial use,
no attribution required): photo-1519336305162, photo-1543754845, photo-1585577517704.

## app-ads.txt
`public/app-ads.txt` is the CAS (Clever Ads Solutions) list, served at https://fastvpn.buzz/app-ads.txt.
The deploy workflow re-downloads the latest version from
github.com/cleveradssolutions/App-ads.txt on every push and once a day (cron), falling back to the
committed copy if the download fails. Don't edit it by hand.
