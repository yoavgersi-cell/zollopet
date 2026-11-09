import { NextResponse } from "next/server";
import sitemap from "../../sitemap";

// IndexNow: push the full sitemap URL list to the shared IndexNow endpoint
// (Bing, Yandex, Seznam, Naver and partners pull from it; Bing is the one
// that matters for Copilot grounding). Fired by the daily Vercel cron (see
// vercel.json) and safe to call manually - resubmitting unchanged URLs is a
// no-op on the engine side. The key file lives at /<key>.txt per protocol.
const KEY = "44f995c77284c6591b57335dd5b74724";
const HOST = "www.zollopet.com";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await sitemap();
  const urlList = entries.map((e) => e.url);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });

  return NextResponse.json({
    submitted: urlList.length,
    indexnowStatus: res.status,
  });
}
