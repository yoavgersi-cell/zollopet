"use client";

import { usePathname } from "next/navigation";
import { VERTICAL_IDS } from "./config";

// The shared chrome (header, footer, 404) is rendered on every page across both
// the legacy root site and the hub. This hook reads the current path and, when
// it sits under a vertical (/<vertical>/…), returns that "/<vertical>" prefix so
// nav links keep the visitor inside the vertical. On the legacy root site the
// first segment is never a vertical id, so it returns "" and links are unchanged.
export function useNavPrefix(): string {
  const pathname = usePathname() || "/";
  const first = pathname.split("/").filter(Boolean)[0];
  return first && VERTICAL_IDS.includes(first) ? `/${first}` : "";
}

// Build a nav href from the active prefix and a root-relative path.
export function navHref(prefix: string, path: string): string {
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}
