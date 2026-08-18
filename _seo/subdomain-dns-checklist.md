# DNS subdomain checklist (SEO / security)

Not published on the site. Owner action required — cannot be fixed from the Jekyll repo.

## Issue

Search results and HTTP checks showed unauthorized subdomains pointing at the `kavehrs.com` zone:

| Host | Status (2026-08-12) | Risk |
|---|---|---|
| `pop.kavehrs.com` | HTTP 200 (spam/gambling content) | High — hurts domain trust |
| `tri.kavehrs.com` | HTTP 404 | Medium — stale DNS record |

The GitHub Pages site is served from `www.kavehrs.com` (or apex). These subdomains are **not** part of this repository.

## Recommended actions

1. Open DNS/registrar panel for `kavehrs.com`.
2. List all `A`, `AAAA`, and `CNAME` records for `*` and named subdomains (`pop`, `tri`, etc.).
3. **Delete** records for subdomains you do not use.
4. Keep only:
   - `@` / `www` → GitHub Pages (or your intended host)
   - Legitimate mail/verification records
5. Optional: add `CAA` records if your DNS provider supports them.
6. In [Google Search Console](https://search.google.com/search-console), check **Security issues** and **Manual actions**.
7. Submit updated sitemap: `https://www.kavehrs.com/sitemap.xml`

## Status (2026-08-18)

Live nameservers are `ken.ns.cloudflare.com` / `melina.ns.cloudflare.com`. API listing of the active zone shows **no** `pop`, `docs`, `tri`, or wildcard `*` records (NXDOMAIN). `www` is a proxied CNAME to `kavehrs.github.io`; apex 301s to `www`. Re-check if a wildcard or spam host reappears; do **not** recreate `*`.

`blog.kavehrs.com` is a DNS-only CNAME to `ghs.google.com` (Blogger: «بریده هایی از دلمشغولی های من») — not the Jekyll site, not spam. Leave unless the owner wants it removed.

Mail: MX currently points at Cloudflare Email Routing, but routing status is `unconfigured` / disabled. ProtonMail verification TXT is also present. Owner should confirm inbound mail to `@kavehrs.com` actually arrives.

Email auth (2026-08-18, owner asked for strictest):

- DMARC: `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; pct=100; fo=1; rua=mailto:…@dmarc-reports.cloudflare.net`
- SPF: `v=spf1 include:_spf.mx.cloudflare.net -all`

Domain hardening (same day):

- DNSSEC enabled at Cloudflare (`status: pending` until DS is published at the registrar):
  `kavehrs.com. 3600 IN DS 2371 13 2 0BDD0957C75EA576647BA21524CE6E8E98640619BF92087B6280EC1CE1FC9CEC`
  CDS/CDNSKEY are published; parent `.com` RDAP still `delegationSigned: false`. Registrar is Hosting Concepts B.V. / Registrar.eu — no API credential in this environment, so DS cannot be pushed from here.
- HSTS: `max-age=31536000; includeSubDomains; preload` + `nosniff`
- Apex HTTP now 301s to `https://kavehrs.com/` first, then HTTPS apex 301s to `www` (required by hstspreload.org). Submitted `kavehrs.com` to the Chromium HSTS preload list; status `pending`.
- CAA tightened to `pki.goog` and `letsencrypt.org` only (removed ssl.com / comodoca / digicert)
