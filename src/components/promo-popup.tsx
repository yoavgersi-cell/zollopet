"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackProviderClick } from "@/lib/analytics";
import type { PromoPopupSpec } from "@/lib/promo-popups";

const APPEAR_AFTER_MS = 15000;
const pad = (n: number) => String(n).padStart(2, "0");

// Mobile-only promo popup, shown on comparison pages where the popup's provider
// is featured. Renders the provider's supplied creative, centered, and - when
// the spec carries a timer - overlays a live countdown on its printed timer
// boxes. Appears at most once per browser session, a few seconds after load.
// The whole image is a tracked affiliate link; only the X closes it.
export function PromoPopup({
  spec,
  href,
  position,
}: {
  spec: PromoPopupSpec;
  href: string;
  position?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [secs, setSecs] = useState(spec.timer?.startSeconds ?? 0);

  useEffect(() => {
    // One promo popup per session across the whole site.
    try {
      if (sessionStorage.getItem("promoPopupSeen")) return;
    } catch {
      // sessionStorage unavailable - show normally.
    }
    const t = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem("promoPopupSeen", "1");
      } catch {
        // ignore
      }
    }, APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || !spec.timer) return;
    const i = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : s)), 1000);
    return () => clearInterval(i);
  }, [visible, spec.timer]);

  if (closed) return null;

  const timer = spec.timer;
  const values = timer
    ? [
        pad(Math.floor(secs / 86400)),
        pad(Math.floor((secs % 86400) / 3600)),
        pad(Math.floor((secs % 3600) / 60)),
        pad(secs % 60),
      ]
    : [];

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center px-2 py-4 transition-opacity duration-300 sm:hidden ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-label={`${spec.providerName} offer`}
    >
      {/* Backdrop - dims the page but does NOT close (exit is via the X only) */}
      <div className="absolute inset-0 h-full w-full bg-black/50" />

      {/* Creative - the whole image links out (tracked) */}
      <div
        className={`relative w-full max-w-[430px] transition-transform duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          onClick={() =>
            trackProviderClick({
              provider_name: spec.providerName,
              provider_slug: spec.providerId,
              provider_position: position,
              page_type: "battle",
              source_flow: "battle_page",
            })
          }
          className="relative block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spec.image}
            alt={spec.alt}
            className="block h-auto w-full rounded-[24px] shadow-2xl"
          />
          {/* Live countdown overlay - sits over the creative's printed timer boxes */}
          {timer &&
            values.map((v, i) => (
              <span
                key={i}
                className="absolute flex items-center justify-center font-extrabold tabular-nums text-white"
                style={{
                  left: timer.boxes[i].left,
                  top: timer.top,
                  width: timer.width,
                  height: timer.height,
                  background: timer.background,
                  borderRadius: "8px",
                  fontSize: "clamp(17px, 5.4vw, 26px)",
                }}
              >
                {v}
              </span>
            ))}
        </a>

        {/* Close - the only way to dismiss the popup */}
        <button
          aria-label="Close"
          onClick={() => setClosed(true)}
          className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-lg ring-2 ring-white/70 transition-colors hover:bg-black"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
