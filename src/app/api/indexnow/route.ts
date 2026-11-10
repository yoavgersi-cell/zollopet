import { NextResponse } from "next/server";
import sitemap from "../../sitemap";

// IndexNow: push the full sitemap URL list to the shared IndexNow endpoint
// (Bing, Yandex, Seznam, Naver and partners pull from it; Bing is the one
// that matters for Copilot grounding). Fired by the daily Vercel cron (see
// vercel.json) and safe to call manually - opening /api/indexnow in a
// browser triggers a submission and shows the result. Resubmitting
// unchanged URLs is a no-op on the engine side. The key file lives at
// /<key>.txt per protocol.
const KEY = "44f995c77284c6591b57335dd5b74724";
const HOST = "www.zollopet.com";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await sitemap();
  const urlList = entries.map((e) => e.url);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(15000),
    });

    // 200 = submitted, 202 = accepted (key validation pending) - both fine.
    return NextResponse.json({
      ok: res.status === 200 || res.status === 202,
      submitted: urlList.length,
      indexnowStatus: res.status,
      keyLocation: `https://${HOST}/${KEY}.txt`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        submitted: 0,
        error: err instanceof Error ? err.message : "submission failed",
      },
      { status: 502 }
    );
  }
}
