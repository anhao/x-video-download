# X Video Downloader

Download videos, GIFs and photos from X (Twitter) posts — up to 4K, no login, no API key.

Built with [TanStack Start](https://tanstack.com/start) and deployed on [Cloudflare Workers](https://workers.cloudflare.com/). UI available in English, 简体中文 and 日本語.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/anhao/x-video-download)

## Features

- **No login, no API key** — resolves media via X's public syndication API
- **All qualities** — every MP4 variant (240p → 4K) with file-size preflight, plus the original HLS playlist
- **Streaming proxy download** — `Content-Disposition: attachment` so the browser saves instead of navigating; supports HTTP Range for in-page preview
- **Batch parse** — paste multiple links (one per line), or just paste anywhere on the page
- **Videos, GIFs and photos** — original-resolution images via `?name=orig`
- **History** — recent parses kept in `localStorage`
- **i18n** — English / 简体中文 / 日本語, auto-detected from your browser

## How it works

```
Browser ── /api/parse?url=… ──▶ Worker ──▶ cdn.syndication.twimg.com (public API)
        ◀── tweet + media JSON ──┘            (base-36 request token, react-tweet scheme)

Browser ── /api/download?t=…&m=…&v=… ──▶ Worker ──▶ video.twimg.com / pbs.twimg.com
        ◀── stream (attachment / Range) ──┘      (host allow-list, no open proxy)
```

The download endpoint only accepts `(tweet id, media index, variant index)` tuples resolved server-side — it never proxies an arbitrary URL. Only `*.twimg.com` hosts are fetched.

## Develop

```bash
npm install
npm run dev        # vite dev on :3000, runs in workerd via @cloudflare/vite-plugin
```

Useful checks:

```bash
npm run check      # biome lint + format
npx tsc --noEmit   # types
npm run build      # production build into dist/
```

## Deploy to Cloudflare

```bash
npm install
npx wrangler login     # once
npm run deploy         # build + wrangler deploy
```

Your app is live at `https://x-video-download.<your-subdomain>.workers.dev`. Free plan is enough (streaming proxying barely counts against CPU time; subrequests are ~7 per parse).

Optional CI: add repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` and `.github/workflows/deploy.yml` will deploy on push to `main`.

## SEO & i18n paths

- `/` is English (default), `/zh` is 简体中文, `/ja` is 日本語 — each is fully server-rendered with its own `<html lang>`, translated `title`/`description`, Open Graph / Twitter card, and `canonical` + `hreflang` (en / zh-CN / ja / x-default)
- `sitemap.xml` and `robots.txt` are generated at the edge and adapt to your deployed domain automatically
- `WebApplication` JSON-LD structured data is embedded in every page
- **Set `VITE_SITE_URL` before deploying** (see `.env.example`) — it emits absolute canonical / hreflang / `og:image` URLs and pins the sitemap to one canonical host. Without it, builds print a warning and URLs stay relative (hreflang is then ignored by Google and share cards lose their image). Pass it as a CI secret in the deploy workflow

## Project layout

```
src/
├── lib/
│   ├── twitter.ts      # syndication client, token scheme, media parsing, size preflight
│   ├── i18n.tsx        # locale provider (path-driven: /, /zh, /ja)
│   └── seo.ts          # head meta, hreflang, JSON-LD, sitemap, robots
├── i18n/               # en / zh / ja dictionaries
├── components/HomePage.tsx  # shared UI: search, skeleton, result cards, preview, history
└── routes/
    ├── api/parse.ts    # GET /api/parse?url=
    ├── api/download.ts # GET /api/download (stream proxy, attachment / Range)
    ├── index.tsx       # /        (English)
    ├── zh/index.tsx    # /zh      (简体中文)
    ├── ja/index.tsx    # /ja      (日本語)
    ├── sitemap[.]xml.ts / robots[.]txt.ts  # edge-generated
    └── __root.tsx      # html shell, dynamic lang, favicon
```

## Limitations

- Works only for **public** posts (nothing behind login, age-gate or region block)
- No HLS remuxing on Workers (no ffmpeg there); the HLS master playlist is offered as a copyable link for players like IINA / VLC
- X may rate-limit the syndication API from a single IP; you'll see a friendly 429 message

## Credits & license

The syndication request-token scheme is adapted from [react-tweet](https://github.com/vercel/react-tweet) (MIT © Vercel).

MIT — use it, fork it, ship it. For personal backup and learning only; respect creators' copyright and X's terms.
