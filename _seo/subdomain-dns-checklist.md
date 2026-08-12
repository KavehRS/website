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

## Verify

```bash
curl -sI https://pop.kavehrs.com/ | head -3
curl -sI https://www.kavehrs.com/ | head -3
```

After cleanup, unknown subdomains should fail or redirect — not serve third-party content.
