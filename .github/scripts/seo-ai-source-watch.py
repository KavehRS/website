#!/usr/bin/env python3
"""Fingerprint official SEO + AI-source docs. Spawn a Cloud Agent only on change."""

from __future__ import annotations

import hashlib
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SOURCES = os.path.join(ROOT, "_seo", "guidance-sources.yml")
FINGERPRINT = os.path.join(ROOT, "_seo", "guidance-fingerprint.txt")

UA = "kavehrs-seo-ai-source-watch/1.0 (+https://www.kavehrs.com/)"


def load_urls(path: str) -> list[str]:
    urls: list[str] = []
    with open(path, encoding="utf-8") as fh:
        for raw in fh:
            line = raw.strip()
            if line.startswith("- http"):
                urls.append(line[2:].strip())
    return urls


def fetch_digest(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,text/plain,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            body = resp.read(400_000)
            etag = resp.headers.get("ETag") or ""
            last_mod = resp.headers.get("Last-Modified") or ""
    except (urllib.error.URLError, TimeoutError, ValueError) as exc:
        return f"FAIL {type(exc).__name__}"
    inner = hashlib.sha256(body).hexdigest()
    return f"{inner} etag={etag} last-mod={last_mod}"


def combined_hash(urls: list[str]) -> tuple[str, str]:
    lines = []
    h = hashlib.sha256()
    for url in urls:
        digest = fetch_digest(url)
        line = f"{url} {digest}"
        lines.append(line)
        h.update(line.encode())
        h.update(b"\n")
    return h.hexdigest(), "\n".join(lines) + "\n"


def read_previous(path: str) -> str:
    if not os.path.isfile(path):
        return ""
    for raw in open(path, encoding="utf-8"):
        if raw.startswith("sha256:"):
            return raw.split(":", 1)[1].strip()
    return ""


def spawn_agent() -> None:
    key = os.environ.get("CURSOR_API_KEY", "")
    if not key:
        print("CURSOR_API_KEY secret not set — fingerprint changed, but skip API trigger.")
        print("Enable Cursor Automation: .cursor/automations/seo-ai-source-watch-prompt.md")
        return

    prompt = """You are the SEO + AI-source watcher for https://www.kavehrs.com (repo KavehRS/website, branch master).

Official SEO or AI-citation guidance fingerprints changed. Monitor those materials and apply technical site changes only — without damaging or changing published content.

Before changing anything:
1. Read AGENTS.md
2. Follow .cursor/skills/seo-ai-source-watch/SKILL.md exactly
3. Obey .cursor/rules/seo-daily-agent.mdc (never edit existing _blog/*.md or _logbook/*.md bodies, titles, or descriptions)
4. Update _seo/guidance-fingerprint.txt and _seo/watch-inbox.md

Apply only robots.txt, /llms.txt, WebMCP, IndexNow, rel=describedby, JSON-LD includes, Cloudflare crawl headers/Content-Signal. Prefer Google Search Central, Bing, schema.org, llmstxt.org, OpenAI OAI-SearchBot, Anthropic Claude-SearchBot.

If nothing material needs changing on the site: do not open a PR; still refresh the unpublished fingerprint.

Never invent climb facts, never duplicate report prose, never keyword-stuff, never commit secrets."""

    body = {
        "name": "SEO + AI-source watch — kavehrs.com",
        "prompt": {"text": prompt},
        "repos": [{
            "url": "https://github.com/KavehRS/website",
            "startingRef": "master",
        }],
        "autoCreatePR": True,
        "skipReviewerRequest": True,
    }
    req = urllib.request.Request(
        "https://api.cursor.com/v1/agents",
        data=json.dumps(body).encode(),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        print(resp.read().decode())
    print("Cloud agent requested.")


def main() -> int:
    urls = load_urls(SOURCES)
    if not urls:
        print("No URLs in", SOURCES, file=sys.stderr)
        return 1
    digest, detail = combined_hash(urls)
    previous = read_previous(FINGERPRINT)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    print(f"fingerprint={digest}")
    print(f"previous={previous or '(none)'}")
    print(detail)
    if digest == previous:
        print("No official-source change — skip agent.")
        return 0
    print("Fingerprint changed at", stamp, "— consider applying technical SEO/AI-source updates.")
    spawn_agent()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
