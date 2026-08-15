#!/usr/bin/env python3
"""Parse an official Instagram data download into a flat post list.

Output is for the instagram-to-blog agent. Do not commit parsed.json.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import zipfile
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Any


TEHRAN = timezone(timedelta(hours=3, minutes=30))
POSTS_NAME = re.compile(r"(posts|media)\d*\.json$", re.I)


def _as_list(value: Any) -> list[Any]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def _timestamp(value: Any) -> int | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return int(value)
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return None


def _text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, dict):
        for key in ("title", "caption", "text", "name"):
            if key in value:
                return _text(value[key])
    return str(value).strip()


def _media_item(raw: dict[str, Any], fallback_ts: int | None) -> dict[str, Any] | None:
    uri = raw.get("uri") or raw.get("path") or raw.get("media_uri")
    if not uri:
        return None
    ts = _timestamp(raw.get("creation_timestamp") or raw.get("taken_at")) or fallback_ts
    return {
        "uri": str(uri),
        "creation_timestamp": ts,
        "title": _text(raw.get("title") or raw.get("caption")),
        "media_type": _guess_type(str(uri)),
    }


def _guess_type(uri: str) -> str:
    lower = uri.lower()
    if lower.endswith((".mp4", ".mov", ".m4v")):
        return "video"
    return "photo"


def _shortcode_from(raw: dict[str, Any]) -> str | None:
    for key in ("shortcode", "code", "instagram_shortcode"):
        value = raw.get(key)
        if isinstance(value, str) and value:
            return value
    url = raw.get("url") or raw.get("permalink") or ""
    match = re.search(r"instagram\.com/(?:p|reel|tv)/([^/?#]+)", str(url))
    if match:
        return match.group(1)
    return None


def _normalize_post(raw: dict[str, Any]) -> dict[str, Any] | None:
    media_raw = raw.get("media") or raw.get("photos") or raw.get("videos")
    items = []
    fallback_ts = _timestamp(
        raw.get("creation_timestamp") or raw.get("taken_at") or raw.get("timestamp")
    )
    if isinstance(media_raw, list):
        for piece in media_raw:
            if isinstance(piece, dict):
                item = _media_item(piece, fallback_ts)
                if item:
                    items.append(item)
    elif isinstance(raw, dict) and (raw.get("uri") or raw.get("path")):
        item = _media_item(raw, fallback_ts)
        if item:
            items.append(item)
    if not items:
        return None

    caption = _text(raw.get("title") or raw.get("caption"))
    if not caption:
        caption = next((m["title"] for m in items if m.get("title")), "")

    ts = fallback_ts or items[0].get("creation_timestamp")
    if not ts:
        return None

    shortcode = _shortcode_from(raw)
    post_id = shortcode or f"ts-{ts}"
    day = datetime.fromtimestamp(ts, TEHRAN).date().isoformat()
    return {
        "id": post_id,
        "instagram_shortcode": shortcode,
        "instagram_url": (
            f"https://www.instagram.com/p/{shortcode}/" if shortcode else None
        ),
        "creation_timestamp": ts,
        "date": day,
        "caption": caption,
        "media": items,
        "skip_reason": None if caption else "caption-less",
    }


def _walk_json(data: Any) -> list[dict[str, Any]]:
    posts: list[dict[str, Any]] = []
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                post = _normalize_post(item)
                if post:
                    posts.append(post)
            elif isinstance(item, list):
                posts.extend(_walk_json(item))
        return posts
    if not isinstance(data, dict):
        return posts
    for key in ("media", "photos", "videos", "ig_posts", "posts"):
        if key in data and isinstance(data[key], list):
            # A top-level album/post vs a bucket of posts
            if data[key] and isinstance(data[key][0], dict) and (
                "uri" in data[key][0] or "media" in data[key][0] or "title" in data[key][0]
            ):
                if "uri" in data[key][0] and "media" not in data:
                    for item in data[key]:
                        post = _normalize_post(item if "media" in item else {"media": [item], **item})
                        if post:
                            posts.append(post)
                    continue
            posts.extend(_walk_json(data[key]))
    if not posts:
        post = _normalize_post(data)
        if post:
            posts.append(post)
    return posts


def _load_json(path: Path) -> Any:
    text = path.read_text(encoding="utf-8")
    return json.loads(text)


def _iter_json_files(root: Path) -> list[Path]:
    if root.is_file() and root.suffix.lower() == ".json":
        return [root]
    files: list[Path] = []
    for path in root.rglob("*.json"):
        name = path.name
        if name in {"parsed.json"}:
            continue
        if POSTS_NAME.search(name) or "post" in name.lower() or name == "media.json":
            files.append(path)
    if not files:
        files = [p for p in root.rglob("*.json") if p.name != "parsed.json"]
    return sorted(files)


def _maybe_unzip(root: Path) -> Path:
    zips = list(root.glob("*.zip")) if root.is_dir() else []
    if root.is_file() and root.suffix.lower() == ".zip":
        zips = [root]
    if not zips:
        return root
    dest = root if root.is_dir() else root.parent
    unpacked = dest / "_unpacked"
    unpacked.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zips[0]) as archive:
        archive.extractall(unpacked)
    return unpacked


def parse(root: Path) -> list[dict[str, Any]]:
    source = _maybe_unzip(root)
    seen: set[str] = set()
    posts: list[dict[str, Any]] = []
    for path in _iter_json_files(source):
        try:
            data = _load_json(path)
        except (OSError, json.JSONDecodeError) as exc:
            print(f"skip {path}: {exc}", file=sys.stderr)
            continue
        for post in _walk_json(data):
            if post["id"] in seen:
                continue
            seen.add(post["id"])
            post["source_file"] = str(path)
            posts.append(post)
    posts.sort(key=lambda item: item["creation_timestamp"])
    return posts


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=Path("_drafts/instagram-export"))
    parser.add_argument("--out", type=Path, default=Path("_drafts/instagram-export/parsed.json"))
    args = parser.parse_args()
    if not args.input.exists():
        print(f"missing input: {args.input}", file=sys.stderr)
        return 2
    posts = parse(args.input)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(
            {
                "account": "imkavehrs",
                "count": len(posts),
                "convertible": sum(1 for p in posts if not p.get("skip_reason")),
                "posts": posts,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"wrote {len(posts)} posts → {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
