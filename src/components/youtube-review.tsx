"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// lucide-react dropped brand icons, so the YouTube mark is drawn inline: the
// rounded-rect + play-triangle logo, in YouTube red.
function YoutubeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect x="0" y="0" width="28" height="20" rx="4.5" fill="#FF0000" />
      <path d="M11.2 5.8v8.4L18.8 10l-7.6-4.2z" fill="#FFFFFF" />
    </svg>
  );
}

// Independent YouTube review videos, embedded unedited. One entry per
// provider id, and every entry is a real, operator-supplied video - never add
// one that hasn't been watched and approved. The framing copy around the
// player must only state what is certain (it's a video about this provider on
// YouTube) - never quote, summarize or characterize the creator's claims.
export interface YoutubeReviewEntry {
  videoId: string;
  // The vertical the video was captured for - the section renders only when
  // the page's vertical matches, so a provider-id collision across verticals
  // (e.g. maximus in hair-loss and trt) can't surface the wrong video.
  vertical: string;
}

export const YOUTUBE_REVIEWS: Record<string, YoutubeReviewEntry> = {};

// Click-to-load player: renders YouTube's own thumbnail with a play button,
// and swaps in the real iframe only after a click. Keeps the review page free
// of YouTube's iframe weight (Core Web Vitals) until the visitor opts in.
// Deliberately uses the standard www.youtube.com embed domain: the
// youtube-nocookie.com variant strips the session signals YouTube's bot check
// relies on, and real visitors were hitting "Sign in to confirm you're not a
// bot" instead of the video.
function LiteYoutubePlayer({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-[#101418] text-left"
    >
      {!thumbFailed && (
        // YouTube's own thumbnail for the video, loaded lazily straight from
        // YouTube's CDN in the visitor's browser. If it can't load, the dark
        // fallback below stands on its own.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          loading="lazy"
          onError={() => setThumbFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />
      <span className="absolute left-1/2 top-1/2 flex h-[52px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[14px] bg-[#FF0000] shadow-lg transition-transform group-hover:scale-105">
        <Play className="h-6 w-6 translate-x-[1px] fill-white text-white" strokeWidth={0} />
      </span>
      <span className="absolute bottom-3 left-4 right-4 text-[13px] font-semibold text-white/95">
        Tap to play the video on YouTube
      </span>
    </button>
  );
}

// Full section for review pages: header, player, and the honesty fine print.
// Renders nothing when the provider has no entry or the vertical mismatches.
export function YoutubeReviewSection({
  providerId,
  providerName,
  vertical,
}: {
  providerId: string;
  providerName: string;
  vertical: string;
}) {
  const entry = YOUTUBE_REVIEWS[providerId];
  if (!entry || entry.vertical !== vertical) return null;

  const title = `${providerName} review on YouTube`;

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
      <div className="mb-2 flex items-center gap-2.5">
        <YoutubeMark className="h-5 w-7 shrink-0" />
        <h2 className="text-[20px] font-bold text-[#22362A]">
          Watch: an independent {providerName} review
        </h2>
      </div>
      <p className="mb-5 text-[14.5px] leading-relaxed text-gray-600">
        Reading reviews is one thing - hearing someone talk through their own experience is
        another. This video comes from an independent creator on YouTube; we embed it unedited
        so you can hear an outside voice before you decide.
      </p>

      <LiteYoutubePlayer videoId={entry.videoId} title={title} />

      <p className="mt-4 text-[11.5px] leading-relaxed text-gray-400">
        The creator&apos;s views are their own. We are not affiliated with the channel and no
        compensation was involved in featuring this video. YouTube is a trademark of Google LLC.
      </p>
    </div>
  );
}
