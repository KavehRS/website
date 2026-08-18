# Daily SEO agent log

Append-only run notes for the scheduled SEO agent. Not published on the site.

## 2026-08-04 — bootstrap

- Added daily SEO skill, Cursor Automation prompt, optional GitHub Actions trigger.
- Baseline: logbook CollectionPage + Mountain Article JSON-LD when `page.peak` is set.
- Auto related links for logbook by shared discipline categories (public UI: flat «گزارش‌های مرتبط :» list).
- Tuned site/logbook descriptions toward گزارش برنامه صعود کوهنوردی / سنگ‌نوردی / یخ‌نوردی.
- Sources consulted at bootstrap: Google Search Central (SEO basics, sitemaps, structured data), schema.org `Article` / `Mountain` / `CollectionPage`, Bing Webmaster Guidelines overview.

## 2026-08-04 — related UI + taxonomy sync

- Related public UI: only «گزارش‌های مرتبط :» + flat list (no «بر اساس نوع برنامه…», no discipline headings).
- Hub `/logbook/` chronological by date.
- Added/confirmed `technical-mountaineering` (کوهنوردی فنی) for ridge/gendarme/alpine hand-and-foot; rock/wall reserved for true rock/wall.
- Kahar pre-report corrected to one-day on ۱۶ مرداد ۱۴۰۵.
- Synced AGENTS.md, logbook rules/skills/template/sample.

## 2026-08-04 — Jalali UI dates

- Footer «آخرین بروزرسانی», post meta, and `/logbook/` list dates use Jalali via `_includes/jalali-date.html` (e.g. 13 مرداد 1405).

## 2026-08-05 — Ascent-report agent

- Added on-demand logbook ascent-report agent: `.cursor/automations/logbook-ascent-report-prompt.md`, `.cursor/rules/logbook-ascent-agent.mdc`, AGENTS.md + skill entry points.

## 2026-08-12 — Full SEO remediation

- **Categories:** normalized all 22 logbook posts to `_data/logbook_disciplines.yml` slugs (`mountaineering` / `ice-climbing` / `training` / `traverse` removed).
- **peak front matter:** added or fixed on all 22 reports (renamed legacy `site:` → `peak:` on ice/rock training posts).
- **Duplicate titles:** Hezarla 1402 vs 1403 titles differentiated.
- **OG image:** Kahar 1405 report uses climb cover in slug folder (placeholder from 1402 until 1405 photos uploaded).
- **DNS (owner action):** `pop.kavehrs.com` spam subdomain — see `_seo/subdomain-dns-checklist.md`.
- Live check: sitemap 35 URLs, robots OK, 0 broken asset refs.

- Weather: use only accurate peak/region sources; omit distant proxies (e.g. Kahar drops Mountain-Forecast).
- Report lifecycle: `report_status: active` until post-climb completion; agent stays active entire time.
- Automation configured but paused until Cursor account recharge; mandatory always-on after.

## 2026-08-12 — Authority roadmap

- Added unpublished `_seo/authority-roadmap.md`: path to become the leading Persian ascent-report source.
- Based on live inventory (22 reports), competitor club SERPs, and Google Search Central people-first / E-E-A-T guidance.
- Does not change published pages.

## 2026-08-12 — No guessed facts

- Owner rule: published data must be sourced or omitted; only that climb’s experience may be un-sourced narrative/GPS/times.
- Added `.cursor/rules/logbook-facts.mdc`; synced AGENTS.md, logbook rules/skill/template/automation.
- Removed rounded placeholder coordinates (Pol-Khab, Kamachal, Dona, Naz geo conflict); stripped `[reference:N]` leftovers.
- Kahar machine elevation/coords aligned to SummitPost/Wikipedia (4015 m) with Persian 4050 noted as disagreement.

## 2026-08-15 — Kahar 1405 published without photos

- Owner: ship this report without waiting for climb photos.
- Removed `image:` and deleted the 1402 team-photo placeholder (`cover.jpeg` was a copy of `6039_orig.jpeg`).
- Asset folder kept with `.gitkeep`. OG/JSON-LD image omitted (not the other climb’s photo, not the site logo as Article image).

## 2026-08-15 — Kahar photos paused + discoverability

- Commented Kahar ۱۴۰۵ `image:` until owner uploads climb photos to `assets/mount/logbook/2026-08-07-kahar-peak/`.
- Homepage: short logbook block + 3 first-hand reports (internal links; people-first, not keyword stuffing).
- Visible byline + crumbs on logbook/blog posts (Google E-E-A-T “Who”).
- BreadcrumbList + hub ItemList; Article image omitted when it would be the site logo.
- Twitter card `summary_large_image`; blog index shows Jalali dates + descriptions.
- Daily SEO skill/automation now audits every sitemap logbook **and** blog URL.
- Sources: Google SEO starter, people-first content, Article + Breadcrumb structured data, sitemap guidance. Bing webmaster page required JS (no extra guideline text).
- Owner still needed: Search Console + Bing sitemap submit, DNS spam (`pop.kavehrs.com`), Cursor recharge so daily SEO/weather automations run.

## 2026-08-18 — Latest blog note SEO + WebMCP remainder

- Target URL: `/blog/2026-08-18-mountaineering-return-knowledge/`
- Live already had unique title/description, canonical, `lang=fa-IR`/`dir=rtl`, single H1, `og:image`/`twitter:image` = `Cover.jpg`, `BlogPosting` from jekyll-seo-tag, sitemap entry, cover `<img class="post-cover">`.
- Fixes implemented:
  - Cover `alt` + `image` hash (`path`/`width`/`height`/`alt`) for OG dimensions and `og:image:alt`
  - `width`/`height` + `fetchpriority="high"` on the cover (CLS/LCP)
  - BreadcrumbList last item now includes `item` URL (Google Breadcrumb docs)
  - In-body links to existing ice-climbing logbook reports (no related-block heading mismatch)
  - Hub `/blog/` description + CollectionPage `about` include mountaineering notes
  - Author JSON-LD name aligned with visible byline (`کاوه‌ رضائی‌شیراز`); `timezone: Asia/Tehran` for ISO dates
  - IndexNow key file (Bing/Yandex); ping after Pages deploy
- WebMCP addable remainder: declarative filter forms on `/logbook/` and `/blog/` (`toolname`/`tooldescription`); catalog tags/categories; `search_site` / `get_ascent_report` / `get_note`
- Beyond-repo: Cloudflare zone `kavehrs.com` (NS ken/melina) is live; `pop`/`docs`/`*` absent. Set `Permissions-Policy: tools=(self)` and `Origin-Agent-Cluster: ?1` on `www` (verified in live response headers). Minimum TLS 1.2. Origin trial token still needs owner Chrome OT signup.

## 2026-08-18 — Cloudflare live-zone audit

Checked via API on active zone `kavehrs.com` (Free, NS ken/melina). Applied:

- SSL `full` → `strict` (GitHub Pages origin still HTTP 200)
- TLS min 1.2 (already), TLS 1.3 on
- HSTS `max-age=15552000` without includeSubDomains/preload; `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`
- Early Hints on
- Apex `always_use_https` + page rule 301 `kavehrs.com/*` → `www`

Left unchanged on purpose: `blog.kavehrs.com` Blogger CNAME; DMARC `p=none`; Rocket Loader off; hotlink protection off; no wildcard.

Owner follow-up: Cloudflare Email Routing MX is present but routing is unconfigured — confirm `@kavehrs.com` mail. Chrome WebMCP origin trial still needs an OT token.

- Sources: Google SEO starter, Article (`BlogPosting`) structured data, Breadcrumb structured data, schema.org BlogPosting, Chrome WebMCP declarative/imperative docs. Bing webmaster page was a sign-in wall.
