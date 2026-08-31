import { NextRequest, NextResponse } from "next/server";
import { getConfig, saveConfig } from "@/lib/config-store";
import { type SiteConfig, DEFAULT_VERTICAL, isVertical } from "@/lib/config";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "zollopet2026";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

// Which vertical's config this request targets. Unknown/absent → the default
// vertical.
function verticalFrom(req: NextRequest): string {
  const v = req.nextUrl.searchParams.get("vertical");
  return v && isVertical(v) ? v : DEFAULT_VERTICAL;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const config = await getConfig(verticalFrom(req));
    return NextResponse.json(config);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as SiteConfig;
    await saveConfig(body, verticalFrom(req));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
