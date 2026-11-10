#!/usr/bin/env python3
"""Generate editorial hero images for articles via the OpenAI Images API.

Usage:
  python3 scripts/gen-article-images.py --count 5          # next 5 without images
  python3 scripts/gen-article-images.py --slugs a,b,c      # specific articles

The API key is NOT in this repo or environment: requests to api.openai.com
go through the session proxy, which injects the stored credential into the
Authorization header (the "Bearer dummy" below is replaced in transit).

Images are requested as compressed WebP directly from the API (gpt-image-1
output_format), saved to public/article-images/<slug>.webp, and the seed
gains `heroImage: "/article-images/<slug>.webp"` right after its heroColor.
Style is uniform: warm editorial photography, cream/sage palette, no text,
no logos, no brand packaging, no human faces - consistent with house rules
(no fake people, no fabricated products).
"""
import argparse
import base64
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "article-images")

SEED_FILES = [
    "src/lib/seeds/article-fresh-dog-food-complete-guide.ts",
    "src/lib/seeds/article-fresh-dog-food-health.ts",
    "src/lib/seeds/articles-fresh-dog-food.ts",
    "src/lib/seeds/article-fresh-cat-food-complete-guide.ts",
    "src/lib/seeds/article-fresh-cat-food-cost.ts",
    "src/lib/seeds/articles-fresh-cat-food.ts",
    "src/lib/seeds/article-pet-insurance-complete-guide.ts",
    "src/lib/seeds/article-pet-insurance-cost-guide.ts",
    "src/lib/seeds/articles-pet-insurance.ts",
    "src/lib/seeds/article-dog-dna-tests-complete-guide.ts",
    "src/lib/seeds/article-dog-dna-health-screening.ts",
    "src/lib/seeds/articles-dog-dna-tests.ts",
]

STYLE = (
    "Warm, natural-light editorial photograph for a premium pet-care magazine. "
    "Soft cream and sage green palette, cozy modern home setting, shallow depth "
    "of field, realistic, high detail. Strictly no text, no words, no letters, "
    "no logos, no brand packaging, no human faces."
)

ALT_SUBJECTS = {
    "fresh-dog-food": "A happy, healthy dog beside a bowl of fresh dog food",
    "fresh-cat-food": "A content cat beside a dish of fresh cat food",
    "pet-insurance": "A calm dog and cat resting safely together at home",
    "dog-dna-tests": "A curious dog in soft natural light",
}

SUBJECTS = {
    "fresh-dog-food": "A happy, healthy dog beside a bowl of fresh, colorful home-style dog food",
    "fresh-cat-food": "A content, healthy cat beside a small dish of fresh, meat-forward cat food",
    "pet-insurance": "A calm dog and cat resting together at home, safe and cared-for mood",
    "dog-dna-tests": "A curious dog in soft light with a subtle science-and-discovery mood",
}


def find_articles():
    """Yield (file, vertical, slug, has_image, pos) in site order."""
    out = []
    for rel in SEED_FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        vertical = next(
            (v for v in SUBJECTS if v in rel),
            "dog-dna-tests" if "dog-dna" in rel else None,
        )
        if vertical is None:
            continue
        src = open(path).read()
        for m in re.finditer(r'slug: "([a-z0-9-]+)",', src):
            # look ahead inside this object for heroImage
            tail = src[m.end():m.end() + 600]
            out.append((rel, vertical, m.group(1), "heroImage:" in tail))
    return out


def title_for(slug):
    return slug.replace("-", " ")


def gen_image(prompt):
    body = json.dumps({
        "model": "gpt-image-2",
        "prompt": prompt,
        "size": "1536x1024",
        "quality": "medium",
        "output_format": "webp",
        "output_compression": 80,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer dummy",  # proxy injects the real key
        },
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.loads(r.read())
    return base64.b64decode(data["data"][0]["b64_json"])


def inject_hero(rel, slug, vertical):
    path = os.path.join(ROOT, rel)
    src = open(path).read()
    pat = re.compile(r'(slug: "' + re.escape(slug) + r'",(?:(?!slug: ")[\s\S]){0,500}?heroColor: "[^"]*",)')
    m = pat.search(src)
    if not m:
        return False
    if "heroImage:" in src[m.start():m.start() + 700]:
        return True
    topic = slug.replace("-", " ")
    alt = f'{ALT_SUBJECTS[vertical]} - illustrating {topic}'
    insert = (m.group(1)
              + f'\n    heroImage: "/article-images/{slug}.webp",'
              + f'\n    heroImageAlt: "{alt}",')
    src = src[:m.start()] + insert + src[m.end():]
    open(path, "w").write(src)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=5)
    ap.add_argument("--slugs", type=str, default="")
    args = ap.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    arts = find_articles()

    if args.slugs:
        wanted = args.slugs.split(",")
        batch = [a for a in arts if a[2] in wanted]
    else:
        # round-robin across verticals, oldest-first within each
        pending = [a for a in arts if not a[3]]
        byv = {}
        for a in pending:
            byv.setdefault(a[1], []).append(a)
        batch, i = [], 0
        while len(batch) < args.count and any(byv.values()):
            for v in list(SUBJECTS):
                if byv.get(v):
                    batch.append(byv[v].pop(0))
                    if len(batch) >= args.count:
                        break
    batch = batch[: args.count]
    if not batch:
        print("nothing to do - all articles have heroImage")
        return

    done = 0
    for rel, vertical, slug, _ in batch:
        prompt = f"{STYLE} Scene: {SUBJECTS[vertical]}, themed around: {title_for(slug)}."
        print(f"generating {slug} ({vertical})...", flush=True)
        try:
            img = gen_image(prompt)
        except Exception as e:
            print(f"  FAILED: {e}", file=sys.stderr)
            continue
        out = os.path.join(OUT_DIR, f"{slug}.webp")
        open(out, "wb").write(img)
        ok = inject_hero(rel, slug, vertical)
        print(f"  saved {len(img)//1024}KB, seed wired: {ok}")
        done += 1
    print(f"\n{done}/{len(batch)} images generated")
    sys.exit(0 if done else 2)


if __name__ == "__main__":
    main()
