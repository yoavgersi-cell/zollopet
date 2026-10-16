#!/usr/bin/env python3
"""Full-site SEO audit against the local prod server: every sitemap URL.

Usage: python3 scripts/seo-audit.py [http://localhost:PORT]
Run `npm run build && npm start -- -p PORT` first. Exits non-zero when a
breakage-class issue is found (non-200, noindex-in-sitemap, broken links,
canonical mismatch, invalid JSON-LD), so a scheduled run can alert on it."""
import datetime
import json
import re
import sys
import urllib.request
from collections import Counter, defaultdict

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4199"
CANON_HOST = "https://www.zollopet.com"

opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))

def get(url):
    try:
        with opener.open(url, timeout=20) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

_, sm = get(BASE + "/sitemap.xml")
urls = re.findall(r"<loc>([^<]+)</loc>", sm)
paths = [u.replace(CANON_HOST, "") or "/" for u in urls]
print(f"sitemap URLs: {len(paths)}")

rows = []
all_links = defaultdict(set)
issues = defaultdict(list)

for p in paths:
    status, html = get(BASE + p)
    title = re.search(r"<title[^>]*>(.*?)</title>", html, re.S)
    title = re.sub(r"\s+", " ", title.group(1)).strip() if title else ""
    desc = re.search(r'<meta name="description" content="([^"]*)"', html)
    desc = desc.group(1) if desc else ""
    canon = re.search(r'<link rel="canonical" href="([^"]*)"', html)
    canon = canon.group(1) if canon else ""
    robots = re.search(r'<meta name="robots" content="([^"]*)"', html)
    robots = robots.group(1) if robots else ""
    h1s = re.findall(r"<h1[\s>]", html)
    ogimg = bool(re.search(r'<meta property="og:image"', html))
    ld_ok, ld_types = True, []
    for m in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S):
        try:
            d = json.loads(m)
            t = d.get("@type") if isinstance(d, dict) else None
            if t:
                ld_types.append(t)
        except Exception:
            ld_ok = False
    for href in re.findall(r'href="(/[^"#?]*)"', html):
        if not href.startswith("/_next") and not href.startswith("/api"):
            all_links[href.rstrip("/") or "/"].add(p)
    rows.append(dict(p=p, status=status, title=title, tl=len(title), desc=desc,
                     dl=len(desc), canon=canon, robots=robots, h1=len(h1s),
                     og=ogimg, ld_ok=ld_ok, ld=ld_types))

for r in rows:
    p = r["p"]
    if r["status"] != 200:
        issues["non-200 in sitemap"].append(f"{p} -> {r['status']}")
    if r["h1"] != 1:
        issues["h1 count != 1"].append(f"{p} ({r['h1']})")
    if not r["title"]:
        issues["missing title"].append(p)
    elif r["tl"] > 65:
        issues["title > 65 chars"].append(f"{p} ({r['tl']})")
    if not r["desc"]:
        issues["missing meta description"].append(p)
    elif r["dl"] > 165:
        issues["description > 165 chars"].append(f"{p} ({r['dl']})")
    expected = CANON_HOST + (p if p != "/" else "")
    if r["canon"] and r["canon"].rstrip("/") != expected.rstrip("/"):
        issues["canonical mismatch"].append(f"{p}: {r['canon']}")
    if not r["canon"]:
        issues["missing canonical"].append(p)
    if "noindex" in r["robots"]:
        issues["noindex in sitemap"].append(p)
    if not r["ld_ok"]:
        issues["invalid JSON-LD"].append(p)
    if not r["og"]:
        issues["missing og:image"].append(p)

for label, key in [("duplicate titles", "title"), ("duplicate descriptions", "desc")]:
    c = Counter(r[key] for r in rows if r[key])
    for v, n in c.items():
        if n > 1:
            pages = [r["p"] for r in rows if r[key] == v][:4]
            issues[label].append(f"x{n}: '{v[:60]}' ({', '.join(pages)})")

sitemap_set = {p.rstrip("/") or "/" for p in paths}
extra = [t for t in all_links if t not in sitemap_set]
broken = []
for t in sorted(extra):
    st, _ = get(BASE + t)
    if st in (404, 0):
        broken.append(f"{t} (linked from {sorted(all_links[t])[0]})")
if broken:
    issues["broken internal links"] = broken

orphans = [p for p in paths if (p.rstrip("/") or "/") not in all_links]
if orphans:
    issues["orphan pages (in sitemap, zero internal links)"] = orphans

print("\n══ ISSUES ══")
if not issues:
    print("none")
for k, v in issues.items():
    print(f"\n── {k} ({len(v)}):")
    for line in v[:12]:
        print("  ", line)
    if len(v) > 12:
        print(f"   ... +{len(v)-12} more")

print("\n══ STATS ══")
print(f"pages checked: {len(rows)}; avg title {sum(r['tl'] for r in rows)//max(len(rows),1)} chars; avg desc {sum(r['dl'] for r in rows)//max(len(rows),1)} chars")
print(f"schema types coverage: {Counter(t for r in rows for t in r['ld'])}")

# content freshness: days since the newest lastmod in the sitemap
dates = re.findall(r"<lastmod>(\d{4}-\d{2}-\d{2})", sm)
if dates:
    newest = max(dates)
    age = (datetime.date.today() - datetime.date.fromisoformat(newest)).days
    flag = "  << STALE: over 10 days without new content" if age > 10 else ""
    print(f"content pulse: newest lastmod {newest} ({age} days ago){flag}")

BREAKAGE = {"non-200 in sitemap", "noindex in sitemap", "broken internal links",
            "canonical mismatch", "invalid JSON-LD", "missing title", "h1 count != 1"}
hard = [k for k in issues if k in BREAKAGE]
if not paths:
    print("\nBREAKAGE: sitemap empty or unreachable")
    raise SystemExit(2)
if hard:
    print(f"\nBREAKAGE detected: {hard}")
    raise SystemExit(2)
